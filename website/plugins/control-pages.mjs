import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The source repository syncs docs/controls.md and docs/api/ into this site, but the control guides
// under docs/controls/ are authored here. A control added to the catalog before its guide exists
// would break the build on the catalog link. This module writes a starter guide from the catalog row
// and the generated API page, marks it, and adds it to the Controls sidebar. Pages without the marker
// are authored and are never rewritten or removed.

export const GENERATED_MARKER = 'fluence-generated-control-page';
const markerComment = `<!-- ${GENERATED_MARKER}: written by website/plugins/control-pages.mjs from docs/controls.md and docs/api/ because no authored guide exists. Delete this comment to author the guide; the build then leaves the file unchanged. -->`;

const defaultDocsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../docs');
const defaultRepository = 'https://github.com/sintaxasn/Fluence.Wpf';
const preferredApiNamespace = 'Fluence.Wpf.Controls';
const controlLink = /^controls\/([a-z0-9]+(?:-[a-z0-9]+)*)\.md(?:#([A-Za-z0-9_-]+))?$/;
const markdownLink = /\[([^\]]*)\]\(([^)\s]+)\)/g;
const identifier = /^[A-Za-z_][A-Za-z0-9_]*$/;

const normalize = (text) => text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
const readText = (file) => normalize(fs.readFileSync(file, 'utf8'));
const blocksOf = (text) => text.split(/\n[ \t]*\n/).map((block) => block.trim()).filter(Boolean);
const pascalCase = (slug) => slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('');
const cell = (text) => text.replace(/\s*\n\s*/g, ' ').replace(/(?<!\\)\|/g, '\\|');

function splitRow(line) {
  const body = line.trim().replace(/^\|/, '').replace(/(?<!\\)\|$/, '');
  const cells = [];
  let current = '';
  for (let i = 0; i < body.length; i++) {
    if (body[i] === '\\' && body[i + 1] === '|') {
      current += '\\|';
      i++;
    } else if (body[i] === '|') {
      cells.push(current.trim());
      current = '';
    } else current += body[i];
  }
  cells.push(current.trim());
  return cells;
}

/**
 * Reads every `controls/<slug>.md` link in the control catalog. A link in the first cell of a table
 * row supplies the guide's name and the row's description; a link with a fragment names a part
 * that the guide must provide as an anchor.
 * @param {string} markdown The catalog Markdown.
 */
export function parseCatalog(markdown) {
  /** @type {Map<string, {slug: string, name: string | null, section: string | null, useFor: string | null, detailHeader: string | null, detail: string | null, parts: {name: string, fragment: string}[]}>} */
  const entries = new Map();
  const ensure = (slug) => {
    if (!entries.has(slug)) {
      entries.set(slug, { slug, name: null, section: null, useFor: null, detailHeader: null, detail: null, parts: [] });
    }
    return entries.get(slug);
  };
  let section = null;
  let header = null;
  let previousWasRow = false;
  for (const line of normalize(markdown).split('\n')) {
    const trimmed = line.trim();
    const heading = /^##\s+(.+?)\s*$/.exec(trimmed);
    if (heading) section = heading[1];
    const isRow = trimmed.startsWith('|');
    let cells = null;
    if (isRow) {
      const row = splitRow(trimmed);
      if (!previousWasRow) header = row;
      else if (!row.every((value) => /^:?-{3,}:?$/.test(value))) cells = row;
    }
    previousWasRow = isRow;
    for (const match of trimmed.matchAll(markdownLink)) {
      const target = controlLink.exec(match[2]);
      if (!target) continue;
      const [, slug, fragment] = target;
      const name = match[1].replace(/`/g, '').trim();
      const entry = ensure(slug);
      entry.section ??= section;
      if (fragment) {
        if (!entry.parts.some((part) => part.fragment === fragment)) entry.parts.push({ name, fragment });
        continue;
      }
      entry.name ??= name;
      if (cells && entry.useFor === null && cells[0].includes(match[0]) && cells.length >= 3) {
        entry.section = section;
        entry.useFor = cells[1];
        entry.detailHeader = header?.[2] ?? null;
        entry.detail = cells[2];
      }
    }
  }
  return [...entries.values()];
}

function parseMember(chunk) {
  const name = /^###\s+(.+?)\s*$/m.exec(chunk)?.[1] ?? '';
  const fence = /```csharp\n([\s\S]*?)\n```/.exec(chunk);
  const signature = fence?.[1].trim() ?? '';
  const after = fence ? chunk.slice(fence.index + fence[0].length) : '';
  const first = blocksOf(after)[0] ?? '';
  return { name, signature, summary: first.startsWith('**') ? '' : first };
}

/**
 * Reads the parts of a generated C# API page that a control guide reuses.
 * @param {string} markdown The API page Markdown.
 */
export function parseApiPage(markdown) {
  const text = normalize(markdown);
  const firstSection = text.search(/^## /m);
  const intro = firstSection < 0 ? text : text.slice(0, firstSection);
  const name = /^#\s+(.+?)\s*$/m.exec(intro)?.[1] ?? '';
  const namespace = /\*\*Namespace:\*\*\s*`([^`]+)`/.exec(intro)?.[1] ?? null;
  const fence = /```csharp\n([\s\S]*?)\n```/.exec(intro);
  const signature = fence?.[1].trim() ?? '';
  const summary = [];
  const remarks = [];
  let source = null;
  let mode = 'summary';
  for (const block of blocksOf(fence ? intro.slice(fence.index + fence[0].length) : '')) {
    const sourceLink = /^\[C# source\]\(([^)\s]+)\)$/.exec(block);
    if (sourceLink) source = sourceLink[1];
    else if (block.startsWith('**Base type:**')) mode = 'done';
    else if (block.startsWith('**Remarks:**')) {
      mode = 'remarks';
      remarks.push(block.replace(/^\*\*Remarks:\*\*\s*/, ''));
    } else if (mode === 'summary') summary.push(block);
    else if (mode === 'remarks') remarks.push(block);
  }
  /** @type {Record<string, {name: string, signature: string, summary: string, anchor: string}[]>} */
  const sections = {};
  if (firstSection >= 0) {
    for (const part of text.slice(firstSection).split(/^## /m).filter(Boolean)) {
      const newline = part.indexOf('\n');
      const title = (newline < 0 ? part : part.slice(0, newline)).trim();
      const pieces = part.split(/<a id="(api-[0-9a-f]+)"><\/a>/);
      const members = [];
      for (let i = 1; i < pieces.length; i += 2) members.push({ anchor: pieces[i], ...parseMember(pieces[i + 1] ?? '') });
      sections[title] = members;
    }
  }
  return { name, namespace, signature, summary, remarks, source, sections };
}

/** Rewrites relative Markdown links so they resolve from another file in the docs tree. */
export function rebaseLinks(text, fromFile, toFile) {
  return text.replace(/(\]\()([^)\s]+)(\))/g, (whole, open, url, close) => {
    if (/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(url)) return whole;
    const hash = url.indexOf('#');
    const pathname = hash < 0 ? url : url.slice(0, hash);
    const fragment = hash < 0 ? '' : url.slice(hash);
    const target = path.posix.join('/docs', pathname ? path.posix.join(path.posix.dirname(fromFile), pathname) : fromFile);
    const relative = path.posix.relative(path.posix.join('/docs', path.posix.dirname(toFile)), target) || path.posix.basename(toFile);
    return `${open}${relative}${fragment}${close}`;
  });
}

function purpose(summary) {
  const trimmed = summary
    .replace(/^Gets or sets (?:a value (?:that )?indicating )?/, '')
    .replace(/^Gets (?:a value (?:that )?indicating )?/, '');
  return trimmed === summary ? summary : trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function findApiPage(docsRoot, name) {
  if (!identifier.test(name)) return null;
  const apiRoot = path.join(docsRoot, 'api');
  if (!fs.existsSync(apiRoot)) return null;
  const namespaces = fs.readdirSync(apiRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => (a === preferredApiNamespace ? -1 : b === preferredApiNamespace ? 1 : a.localeCompare(b)));
  for (const namespace of namespaces) {
    const relative = `api/${namespace}/${name}.md`;
    if (fs.existsSync(path.join(docsRoot, relative))) return relative;
  }
  return null;
}

function sourceLink(source, repository, page) {
  const prefix = `${repository}/blob/main/`;
  if (!source?.startsWith(prefix)) return source;
  return path.posix.relative(path.posix.join('/docs', path.posix.dirname(page)), `/${source.slice(prefix.length)}`);
}

/**
 * Builds the Markdown for a control guide from its catalog entry and API reference.
 * @param {object} input
 * @param {ReturnType<typeof parseCatalog>[number]} input.entry The catalog entry.
 * @param {string} input.docsRoot The docs directory.
 * @param {string} [input.repository] The source repository URL.
 */
export function renderControlPage({ entry, docsRoot, repository = defaultRepository }) {
  const page = `controls/${entry.slug}.md`;
  const name = entry.name && identifier.test(entry.name) ? entry.name : pascalCase(entry.slug);
  const apiPath = findApiPage(docsRoot, name);
  const api = apiPath ? parseApiPage(readText(path.join(docsRoot, apiPath))) : null;
  const fromApi = (text) => rebaseLinks(text, apiPath, page);
  const apiLink = (anchor) => `${path.posix.relative('controls', apiPath)}${anchor ? `#${anchor}` : ''}`;
  const out = [`# ${name}`, '', markerComment, '', '## Description', ''];

  if (api?.summary.length) out.push(...api.summary.map(fromApi).flatMap((block) => [block, '']));
  if (entry.useFor !== null) {
    out.push(`| Use it for | ${cell(entry.detailHeader ?? 'Details')} |`, '| --- | --- |');
    out.push(`| ${cell(rebaseLinks(entry.useFor, 'controls.md', page))} | ${cell(rebaseLinks(entry.detail ?? '', 'controls.md', page))} |`, '');
  }
  if (!api?.summary.length && entry.useFor === null) out.push(`See the [control catalog](../controls.md).`, '');

  const light = `screenshots/controls/${entry.slug}-light.png`;
  const dark = `screenshots/controls/${entry.slug}-dark.png`;
  if (fs.existsSync(path.join(docsRoot, light)) && fs.existsSync(path.join(docsRoot, dark))) {
    out.push('| Light | Dark |', '| --- | --- |',
      `| ![${name} in light mode](../${light}) | ![${name} in dark mode](../${dark}) |`, '');
  }

  const instantiable = api && api.namespace === preferredApiNamespace
    && /^public\s+(?:sealed\s+|partial\s+)*class\s/.test(api.signature)
    && (api.sections.Constructors ?? []).some((member) => member.signature === `public ${name}()`);
  if (instantiable) {
    const variable = name.charAt(0).toLowerCase() + name.slice(1);
    out.push('## Example usage', '', '```xml', `<fluence:${name} />`, '```', '',
      '```csharp', `var ${variable} = new ${api.namespace}.${name}();`, '```', '');
  }

  const properties = (api?.sections.Properties ?? []).flatMap((member) => {
    const type = new RegExp(`^public\\s+(?:(?:new|virtual|override|sealed|required)\\s+)*(.+?)\\s+${member.name}\\s*\\{`).exec(member.signature);
    return type ? [`| [\`${member.name}\`](${apiLink(member.anchor)}) | \`${cell(type[1])}\` | ${cell(fromApi(purpose(member.summary)))} |`] : [];
  });
  if (properties.length) out.push('## Key properties', '', '| Property | Type | Purpose |', '| --- | --- | --- |', ...properties, '');

  if (api?.remarks.length) out.push('## State and behavior', '', ...api.remarks.map(fromApi).flatMap((block) => [block, '']));

  const events = (api?.sections.Events ?? []).flatMap((member) => (/^public\s.*\bevent\s/.test(member.signature)
    ? [`| [\`${member.name}\`](${apiLink(member.anchor)}) | ${cell(fromApi(member.summary))} |`] : []));
  if (events.length) out.push('## Events', '', '| Event | Purpose |', '| --- | --- |', ...events, '');

  const parity = path.join(docsRoot, 'winui-parity.md');
  if (fs.existsSync(parity) && readText(parity).includes(`\`${name}\``)) {
    out.push('## Related', '', '- [WinUI parity and differences](../winui-parity.md)', '');
  }

  if (entry.parts.length) {
    out.push('## Parts', '');
    for (const part of entry.parts) {
      const partName = identifier.test(part.name) ? part.name : pascalCase(part.fragment);
      const partPath = findApiPage(docsRoot, partName);
      const partApi = partPath ? parseApiPage(readText(path.join(docsRoot, partPath))) : null;
      out.push(`### ${partName} {#${part.fragment}}`, '');
      if (partApi?.summary.length) out.push(...partApi.summary.map((block) => rebaseLinks(block, partPath, page)).flatMap((block) => [block, '']));
      if (partPath) out.push(`- [C# API reference](${path.posix.relative('controls', partPath)})`, '');
    }
  }

  out.push('## Reference', '');
  if (apiPath) out.push(`- [C# API reference](${apiLink()})`);
  if (api?.source) out.push(`- [Control source](${sourceLink(api.source, repository, page)})`);
  out.push('- [Control catalog](../controls.md)', '');
  return `\uFEFF${out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd()}\n`;
}

// Ownership needs the marker comment directly under the title, where the generator writes it.
// A guide that only mentions the marker elsewhere is authored and stays untouched.
const generatedHead = new RegExp(String.raw`^# [^\n]+\n\n<!-- ${GENERATED_MARKER}: [^\n]*-->\n`);

/** Reports whether guide Markdown was written by this generator. */
export const isGeneratedContent = (text) => generatedHead.test(normalize(text));
const isGenerated = (file) => fs.existsSync(file) && isGeneratedContent(fs.readFileSync(file, 'utf8'));

function catalogEntries(docsRoot) {
  const catalog = path.join(docsRoot, 'controls.md');
  return fs.existsSync(catalog) ? parseCatalog(readText(catalog)) : [];
}

/**
 * Writes a guide for each catalog control without an authored page, refreshes earlier generated
 * guides, and removes generated guides the catalog no longer links.
 * @param {{docsRoot?: string, repository?: string, write?: boolean}} [options]
 */
export function syncControlPages({ docsRoot = defaultDocsRoot, repository = defaultRepository, write = true } = {}) {
  const result = { written: [], unchanged: [], removed: [] };
  const controlsDir = path.join(docsRoot, 'controls');
  const entries = catalogEntries(docsRoot);
  const linked = new Set(entries.map((entry) => entry.slug));
  for (const entry of entries) {
    const file = path.join(controlsDir, `${entry.slug}.md`);
    if (fs.existsSync(file) && !isGenerated(file)) continue;
    const content = renderControlPage({ entry, docsRoot, repository });
    const relative = `controls/${entry.slug}.md`;
    if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === content) {
      result.unchanged.push(relative);
      continue;
    }
    if (write) {
      fs.mkdirSync(controlsDir, { recursive: true });
      fs.writeFileSync(file, content, 'utf8');
    }
    result.written.push(relative);
  }
  if (fs.existsSync(controlsDir)) {
    for (const name of fs.readdirSync(controlsDir)) {
      const file = path.join(controlsDir, name);
      if (!name.endsWith('.md') || linked.has(name.slice(0, -3)) || !isGenerated(file)) continue;
      if (write) fs.rmSync(file);
      result.removed.push(`controls/${name}`);
    }
  }
  return result;
}

function sidebarDocIds(items, owner, map) {
  for (const item of items) {
    if (typeof item === 'string') map.set(item, owner);
    else if (item?.type === 'doc') map.set(item.id, owner);
    else if (item?.type === 'category') {
      if (item.link?.type === 'doc') map.set(item.link.id, item);
      sidebarDocIds(item.items ?? [], item, map);
    }
  }
  return map;
}

/**
 * Adds catalog controls that have a guide but no Controls sidebar entry. Each goes into the
 * category that holds most of its catalog section's other guides, or into a new category named
 * after the section.
 * @param {any[]} sidebar The Controls sidebar items.
 * @param {{docsRoot?: string}} [options]
 */
export function addCatalogControls(sidebar, { docsRoot = defaultDocsRoot } = {}) {
  const entries = catalogEntries(docsRoot);
  const listed = sidebarDocIds(sidebar, null, new Map());
  const created = new Map();
  for (const entry of entries) {
    const id = `controls/${entry.slug}`;
    const file = path.join(docsRoot, `${id}.md`);
    if (listed.has(id) || !fs.existsSync(file)) continue;
    const frontMatter = /^---\n([\s\S]*?)\n---\n/.exec(readText(file))?.[1] ?? '';
    if (/^unlisted:\s*true\s*$/m.test(frontMatter)) continue;
    const votes = new Map();
    for (const sibling of entries) {
      const category = sibling.section === entry.section ? listed.get(`controls/${sibling.slug}`) : null;
      if (category) votes.set(category, (votes.get(category) ?? 0) + 1);
    }
    let target = [...votes].sort((a, b) => b[1] - a[1])[0]?.[0];
    if (!target) {
      const label = entry.section ?? 'More controls';
      target = created.get(label);
      if (!target) {
        target = { type: 'category', label, items: [] };
        const trailingRef = sidebar.findIndex((item, index) => sidebar.slice(index).every((rest) => rest?.type === 'ref'));
        sidebar.splice(trailingRef < 0 ? sidebar.length : trailingRef, 0, target);
        created.set(label, target);
      }
    }
    target.items.push(id);
    listed.set(id, target);
  }
  return sidebar;
}

/**
 * Docusaurus plugin that generates missing control guides before the docs plugin reads the docs tree.
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {{docsPath?: string, repository?: string}} options
 */
export default function controlPagesPlugin(context, options = {}) {
  const docsRoot = path.resolve(context.siteDir, options.docsPath ?? '../docs');
  const result = syncControlPages({ docsRoot, repository: options.repository ?? defaultRepository });
  for (const page of result.written) console.log(`[fluence-control-pages] Generated docs/${page}`);
  for (const page of result.removed) console.log(`[fluence-control-pages] Removed unlinked generated docs/${page}`);
  return { name: 'fluence-control-pages' };
}
