import {createHash} from 'node:crypto';
import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mediaRoot = join(siteRoot, 'static', 'images', 'features');
const geometryPath = join(siteRoot, 'src', 'pages', 'backdrops.geometry.json');
const wallpaperPath = join(mediaRoot, 'backdrops-realme-pad-2.jpg');
const themes = ['light', 'dark'];

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex').toUpperCase();
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function hashMedia(root, theme) {
  return {
    gifSha256: sha256(join(root, `backdrops-${theme}.gif`)),
    posterSha256: sha256(join(root, `backdrops-${theme}.png`)),
  };
}

function checkSite(geometry) {
  assert(geometry.wallpaper.sourceSha256 === sha256(wallpaperPath), 'Backdrop wallpaper differs from capture geometry.');
  assert(geometry.frame.width > 0 && geometry.frame.height > 0, 'Backdrop frame dimensions must be positive.');
  assert(geometry.wallpaper.imageDrawWidth > 0 && geometry.wallpaper.imageDrawHeight > 0, 'Drawn wallpaper dimensions must be positive.');
  assert(Number.isFinite(geometry.wallpaper.imageDrawX) && Number.isFinite(geometry.wallpaper.imageDrawY), 'Drawn wallpaper origin is invalid.');
  assert(geometry.wallpaper.imageDrawWidth >= geometry.wallpaper.hostWidth &&
    geometry.wallpaper.imageDrawHeight >= geometry.wallpaper.hostHeight, 'Wallpaper drawing does not cover its capture host.');
  assert(Math.abs(geometry.wallpaper.imageDrawX * 2 + geometry.wallpaper.imageDrawWidth - geometry.wallpaper.hostWidth) <= 1 &&
    Math.abs(geometry.wallpaper.imageDrawY * 2 + geometry.wallpaper.imageDrawHeight - geometry.wallpaper.hostHeight) <= 1,
  'Wallpaper drawing is not centered on its capture host.');
  for (const theme of themes) {
    const expected = geometry[theme];
    const actual = hashMedia(mediaRoot, theme);
    assert(expected.gifSha256 === actual.gifSha256, `${theme} backdrop GIF differs from capture geometry.`);
    assert(expected.posterSha256 === actual.posterSha256, `${theme} backdrop poster differs from capture geometry.`);
    assert(Number.isFinite(expected.captureX) && Number.isFinite(expected.captureY), `${theme} capture origin is invalid.`);
    assert(expected.captureX >= 0 && expected.captureX + geometry.frame.width <= geometry.wallpaper.hostWidth &&
      expected.captureY >= 0 && expected.captureY + geometry.frame.height <= geometry.wallpaper.hostHeight,
    `${theme} capture frame lies outside its wallpaper host.`);
  }
  assert(geometry.light.captureX === geometry.dark.captureX && geometry.light.captureY === geometry.dark.captureY,
    'Light and Dark backdrop captures must share a wallpaper origin.');
  assert(Math.abs(geometry.light.captureX * 2 + geometry.frame.width - geometry.wallpaper.hostWidth) <= 1 &&
    Math.abs(geometry.light.captureY * 2 + geometry.frame.height - geometry.wallpaper.hostHeight) <= 1,
  'Backdrop capture frame is not centered on its wallpaper host.');
}

function captureGeometry(sourceRoot, theme) {
  const timelinePath = join(sourceRoot, 'artifacts', 'feature-animation', `backdrops-${theme}`, 'timeline.json');
  const timeline = readJson(timelinePath);
  const frames = timeline.frames;
  assert(Array.isArray(frames) && frames.length > 0, `${theme} capture timeline is empty.`);
  const first = frames[0];
  assert(frames.every((frame) => frame.captureX === first.captureX && frame.captureY === first.captureY &&
    frame.width === first.width && frame.height === first.height), `${theme} capture geometry changed within the animation.`);
  assert(frames.every((frame) => frame.windowActive && frame.wallpaperHostVisible &&
    frame.windowCloak === 0 && frame.wallpaperHostCloak === 0), `${theme} has an inactive or hidden capture frame.`);
  assert(timeline.wallpaper.positioning.startsWith('center center'), `${theme} wallpaper positioning is unsupported.`);
  assert(timeline.wallpaper.sourceSha256 === sha256(wallpaperPath), `${theme} wallpaper source differs from this website.`);
  const sourceMedia = join(sourceRoot, 'website', 'static', 'images', 'features');
  const captured = hashMedia(sourceMedia, theme);
  return {
    frame: {width: first.width, height: first.height},
    wallpaper: {
      sourceSha256: timeline.wallpaper.sourceSha256,
      hostX: timeline.wallpaper.hostX,
      hostY: timeline.wallpaper.hostY,
      hostWidth: timeline.wallpaper.hostWidth,
      hostHeight: timeline.wallpaper.hostHeight,
      imageDrawX: timeline.wallpaper.imageDrawX,
      imageDrawY: timeline.wallpaper.imageDrawY,
      imageDrawWidth: timeline.wallpaper.imageDrawWidth,
      imageDrawHeight: timeline.wallpaper.imageDrawHeight,
    },
    theme: {
      captureX: first.captureX - timeline.wallpaper.hostX,
      captureY: first.captureY - timeline.wallpaper.hostY,
      ...captured,
    },
  };
}

if (process.argv[2] === '--verify-source' || process.argv[2] === '--write') {
  assert(process.argv.length === 4, 'Usage: node scripts/backdrop-geometry.mjs --verify-source|--write <Fluence.Wpf checkout>');
  const sourceRoot = resolve(process.argv[3]);
  const light = captureGeometry(sourceRoot, 'light');
  const dark = captureGeometry(sourceRoot, 'dark');
  assert(JSON.stringify(light.frame) === JSON.stringify(dark.frame), 'Light and Dark frame dimensions differ.');
  assert(JSON.stringify(light.wallpaper) === JSON.stringify(dark.wallpaper), 'Light and Dark wallpaper geometry differs.');
  const geometry = {frame: light.frame, wallpaper: light.wallpaper, light: light.theme, dark: dark.theme};
  assert(geometry.light.captureX === geometry.dark.captureX && geometry.light.captureY === geometry.dark.captureY,
    'Light and Dark backdrop captures must share a wallpaper origin.');
  assert(Math.abs(geometry.light.captureX * 2 + geometry.frame.width - geometry.wallpaper.hostWidth) <= 1 &&
    Math.abs(geometry.light.captureY * 2 + geometry.frame.height - geometry.wallpaper.hostHeight) <= 1,
  'Backdrop capture frame is not centered on its wallpaper host.');
  assert(geometry.frame.width > 0 && geometry.frame.height > 0 &&
    geometry.wallpaper.hostWidth > 0 && geometry.wallpaper.hostHeight > 0 &&
    geometry.wallpaper.imageDrawWidth >= geometry.wallpaper.hostWidth &&
    geometry.wallpaper.imageDrawHeight >= geometry.wallpaper.hostHeight,
  'Source capture frame or wallpaper host dimensions are invalid.');
  assert(Number.isFinite(geometry.wallpaper.imageDrawX) && Number.isFinite(geometry.wallpaper.imageDrawY),
    'Source wallpaper draw origin is invalid.');
  assert(Math.abs(geometry.wallpaper.imageDrawX * 2 + geometry.wallpaper.imageDrawWidth - geometry.wallpaper.hostWidth) <= 1 &&
    Math.abs(geometry.wallpaper.imageDrawY * 2 + geometry.wallpaper.imageDrawHeight - geometry.wallpaper.hostHeight) <= 1,
  'Source wallpaper is not centered on its capture host.');
  assert(geometry.light.captureX >= 0 && geometry.light.captureX + geometry.frame.width <= geometry.wallpaper.hostWidth &&
    geometry.light.captureY >= 0 && geometry.light.captureY + geometry.frame.height <= geometry.wallpaper.hostHeight,
  'Source capture frame lies outside its wallpaper host.');
  if (process.argv[2] === '--write') {
    checkSite(geometry);
    writeFileSync(geometryPath, `\uFEFF${JSON.stringify(geometry, null, 2)}\n`, 'utf8');
    console.log(`Wrote backdrop geometry from accepted Light and Dark timelines: ${geometryPath}`);
  } else {
    console.log(JSON.stringify(geometry, null, 2));
  }
} else {
  assert(process.argv.length === 3 && process.argv[2] === '--check',
    'Usage: node scripts/backdrop-geometry.mjs --check');
  checkSite(readJson(geometryPath));
  console.log('Backdrop geometry and website media hashes match.');
}
