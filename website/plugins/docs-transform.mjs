import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../docs');
const repoRoot = path.resolve(docsRoot, '..');
const modeToken = /(^|[-_])(light|dark)(?=[-_.]|$)/i;

function inDirectory(file, directory) {
  const relative = path.relative(directory, file);
  return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function counterpartUrl(url) {
  const match = modeToken.exec(url);
  if (!match) return null;
  const mode = match[2].toLowerCase();
  const swapped = mode === 'light' ? 'dark' : 'light';
  return {
    mode,
    url: `${url.slice(0, match.index + match[1].length)}${swapped}${url.slice(match.index + match[0].length)}`,
  };
}

function imageMode(image) {
  return image?.type === 'image' ? counterpartUrl(image.url) : null;
}

function imageIn(node) {
  if (node?.type === 'image') return node;
  if (node?.type === 'paragraph' || node?.type === 'tableCell') {
    const meaningful = node.children?.filter((child) => child.type !== 'text' || child.value.trim());
    if (meaningful?.length === 1 && meaningful[0].type === 'image') return meaningful[0];
  }
  return null;
}

function samePair(a, b) {
  const first = imageMode(a);
  const second = imageMode(b);
  return first && second && first.mode !== second.mode && first.url === b.url;
}

function tag(image, mode) {
  image.data ??= {};
  image.data.hProperties ??= {};
  image.data.hProperties.className = `fluence-theme-image--${mode}`;
}

function markPair(a, b) {
  tag(a, imageMode(a).mode);
  tag(b, imageMode(b).mode);
}

function counterpartExists(image, filePath) {
  const candidate = imageMode(image);
  if (!candidate || !candidate.url || /^(?:[a-z][a-z\d+.-]*:|\/)/i.test(candidate.url)) return null;
  const filename = path.resolve(path.dirname(filePath), decodeURIComponent(candidate.url.split(/[?#]/, 1)[0]));
  return inDirectory(filename, repoRoot) && fs.existsSync(filename) ? candidate : null;
}

function cloneCounterpart(image, candidate) {
  const alternateMode = candidate.mode === 'light' ? 'dark' : 'light';
  const clone = { ...image, url: candidate.url,
    alt: image.alt?.replace(/\blight\b|\bdark\b/gi, alternateMode) };
  delete clone.position;
  delete clone.data;
  return clone;
}

function transformTable(table) {
  if (table.children?.length < 2 || table.children.some((row) => row.children?.length !== 2)) return null;
  const labels = table.children[0].children.map((cell) => cell.children?.map((child) => child.type === 'text' ? child.value : '').join('').trim().toLowerCase());
  if (labels[0] !== 'light' || labels[1] !== 'dark') return null;
  const pairs = table.children.slice(1).map((row) => row.children.map(imageIn));
  if (!pairs.every(([a, b]) => samePair(a, b))) return null;
  return pairs.map(([light, dark]) => {
    markPair(light, dark);
    return { type: 'paragraph', children: [light, { type: 'text', value: ' ' }, dark] };
  });
}

function transformSequence(parent) {
  if (!Array.isArray(parent.children)) return;
  for (let i = 0; i < parent.children.length; i++) {
    const current = parent.children[i];
    if (current.type === 'table') {
      const paragraphs = transformTable(current);
      if (paragraphs) {
        parent.children.splice(i, 1, ...paragraphs);
        i--;
        continue;
      }
    }
    if (current.type === 'paragraph') {
      const images = current.children.filter((child) => child.type === 'image');
      if (images.length === 2 && samePair(images[0], images[1])) markPair(images[0], images[1]);
      const next = parent.children[i + 1];
      const a = imageIn(current);
      const b = imageIn(next);
      if (a && b && (samePair(a, b) || samePair(b, a))) {
        markPair(a, b);
        current.children.push({ type: 'text', value: ' ' }, b);
        parent.children.splice(i + 1, 1);
      }
    }
    transformSequence(current);
  }
}

function rewriteLinksAndLoneImages(node, filePath, repository) {
  if (node.type === 'link' && node.url && !/^(?:[a-z][a-z\d+.-]*:|#|\/)/i.test(node.url)) {
    const [withoutFragment, fragment] = node.url.split('#', 2);
    const [pathname, query] = withoutFragment.split('?', 2);
    const resolved = path.resolve(path.dirname(filePath), decodeURIComponent(pathname));
    if (!inDirectory(resolved, docsRoot) && inDirectory(resolved, repoRoot)) {
      const relative = path.relative(repoRoot, resolved).split(path.sep).map(encodeURIComponent).join('/');
      node.url = `${repository}/blob/main/${relative}${query ? `?${query}` : ''}${fragment ? `#${fragment}` : ''}`;
    }
  }
  if (Array.isArray(node.children)) {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child.type === 'image' && !child.data?.hProperties?.className) {
        const mode = imageMode(child);
        const candidate = counterpartExists(child, filePath);
        if (candidate) {
          const alternate = cloneCounterpart(child, candidate);
          tag(child, candidate.mode);
          tag(alternate, candidate.mode === 'light' ? 'dark' : 'light');
          node.children.splice(i + 1, 0, { type: 'text', value: ' ' }, alternate);
          i += 2;
        } else if (mode) tag(child, mode.mode);
      } else rewriteLinksAndLoneImages(child, filePath, repository);
    }
  }
}

function wrapThemeImages(node) {
  if (!Array.isArray(node.children)) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const className = child.type === 'image' && child.data?.hProperties?.className;
    if (className) {
      const wrapperClass = child.url.includes('/screenshots/controls/')
        ? `${className} fluence-control-image`
        : className;
      node.children[i] = {
        type: 'mdxJsxTextElement',
        name: 'span',
        attributes: [{ type: 'mdxJsxAttribute', name: 'className', value: wrapperClass }],
        children: [child],
      };
    } else wrapThemeImages(child);
  }
}

function groupWpfExamples(node) {
  if (!Array.isArray(node.children)) return;
  for (let i = 0; i < node.children.length; i++) {
    const xaml = node.children[i];
    const csharp = node.children[i + 1];
    if (xaml.type === 'code' && ['xml', 'xaml'].includes(xaml.lang)
      && csharp?.type === 'code' && ['csharp', 'cs'].includes(csharp.lang)) {
      const tab = (value, label, code) => ({
        type: 'mdxJsxFlowElement',
        name: 'WpfCodeTab',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'value', value },
          { type: 'mdxJsxAttribute', name: 'label', value: label },
        ],
        children: [code],
      });
      node.children.splice(i, 2, {
        type: 'mdxJsxFlowElement',
        name: 'WpfCodeTabs',
        attributes: [{ type: 'mdxJsxAttribute', name: 'defaultValue', value: 'xaml' }],
        children: [tab('xaml', 'XAML', xaml), tab('csharp', 'C#', csharp)],
      });
    } else groupWpfExamples(xaml);
  }
}

export function transformTree(tree, filePath, repository) {
  groupWpfExamples(tree);
  transformSequence(tree);
  rewriteLinksAndLoneImages(tree, path.resolve(filePath), repository);
  wrapThemeImages(tree);
  return tree;
}

export default function docsTransform({ repository }) {
  return (tree, file) => transformTree(tree, file.path, repository);
}
