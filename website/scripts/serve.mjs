import { stat } from 'node:fs/promises';
import http from 'node:http';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// These private imports match the locked @docusaurus/core 3.10.2 serve command;
// recheck them when upgrading Docusaurus. Its clean-URL lookup misses a .html
// file when a dotted namespace also names the directory for its type pages.
const requireHere = createRequire(import.meta.url);
const requireFromCore = createRequire(requireHere.resolve('@docusaurus/core/package.json'));
const serveHandler = requireFromCore('serve-handler');
const { loadSiteConfig } = requireFromCore('./lib/server/config');
const { build } = requireFromCore('./lib/commands/build/build');
const { applyTrailingSlash } = requireFromCore('@docusaurus/utils-common');
const siteDir = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));

function readOptions(args) {
  if (args.includes('--help')) {
    console.log('Usage: pnpm serve [--dir <dir>] [--config <config>] [-p, --port <port>] [-h, --host <host>] [--build] [--no-open]');
    process.exit(0);
  }
  const options = { host: '127.0.0.1', port: 3000, dir: 'build', build: false };
  for (let index = 0; index < args.length; index += 1) {
    const separator = args[index].indexOf('=');
    const suppliedFlag = separator < 0 ? args[index] : args[index].slice(0, separator);
    const inlineValue = separator < 0 ? undefined : args[index].slice(separator + 1);
    const flag = { '-h': '--host', '-p': '--port' }[suppliedFlag] ?? suppliedFlag;
    if (flag === '--no-open') continue;
    if (flag === '--build') {
      options.build = true;
      continue;
    }
    if (!['--host', '--port', '--dir', '--config'].includes(flag)) {
      throw new Error(`Unsupported serve option: ${args[index]}`);
    }
    const value = inlineValue ?? args[++index];
    if (!value || value.startsWith('--')) throw new Error(`Missing value for ${flag}`);
    options[flag.slice(2)] = value;
  }
  options.port = Number(options.port);
  if (!Number.isInteger(options.port) || options.port < 0 || options.port > 65535) {
    throw new Error('Port must be an integer from 0 to 65535');
  }
  return options;
}

async function isCollision(outDir, pathname) {
  const match = /^\/docs\/api\/([A-Za-z][A-Za-z0-9.]*)$/.exec(pathname);
  if (!match || !match[1].includes('.')) return false;

  const stem = path.join(outDir, 'docs', 'api', match[1]);
  try {
    const [directory, page] = await Promise.all([stat(stem), stat(`${stem}.html`)]);
    return directory.isDirectory() && page.isFile();
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return false;
    throw error;
  }
}

const { host, port, dir, config, build: buildBeforeServe } = readOptions(process.argv.slice(2));
const outDir = path.resolve(siteDir, dir);
if (buildBeforeServe) await build(siteDir, { config, outDir });
if (!(await stat(outDir)).isDirectory()) throw new Error(`Build directory is missing: ${outDir}`);
const { siteConfig } = await loadSiteConfig({ siteDir, customConfigFilePath: config });
const baseUrl = siteConfig.baseUrl;
const normalOptions = {
  cleanUrls: true,
  public: outDir,
  trailingSlash: siteConfig.trailingSlash,
  directoryListing: false,
};

const server = http.createServer(async (request, response) => {
  try {
    if (!request.url?.startsWith(baseUrl)) {
      response.writeHead(302, { Location: baseUrl });
      response.end();
      return;
    }

    // Keep Docusaurus's base-path redirect and ordinary serve-handler behavior.
    if (baseUrl !== '/' && !request.url.match(/\.[a-zA-Z\d]{1,4}$/)) {
      const normalizedUrl = applyTrailingSlash(request.url, {
        trailingSlash: siteConfig.trailingSlash,
        baseUrl,
      });
      if (request.url !== normalizedUrl) {
        response.writeHead(302, { Location: normalizedUrl });
        response.end();
        return;
      }
    }
    request.url = request.url.replace(baseUrl, '/');
    const parsed = new URL(request.url, 'http://localhost');
    if (await isCollision(outDir, parsed.pathname)) {
      request.url = `${parsed.pathname}.html${parsed.search}`;
      await serveHandler(request, response, { ...normalOptions, cleanUrls: false });
      return;
    }
    await serveHandler(request, response, normalOptions);
  } catch (error) {
    console.error(error);
    if (!response.headersSent) response.writeHead(500);
    response.end();
  }
});

server.listen(port, host, () => {
  const address = server.address();
  console.log(`Serving "${dir}" directory at: http://${host}:${address.port}${baseUrl}`);
});
