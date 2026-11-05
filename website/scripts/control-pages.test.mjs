import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test, { after } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  GENERATED_MARKER, addCatalogControls, isGeneratedContent, parseApiPage, parseCatalog, rebaseLinks, syncControlPages,
} from '../plugins/control-pages.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const realDocs = path.resolve(here, '../../docs');

const catalog = `\uFEFF# Control catalog

## Data and collections

| Types | Use them for | Key detail |
| --- | --- | --- |
| [ListView](controls/list-view.md) | Lists | Selection |
| [Widget](controls/widget.md), [WidgetItem](controls/widget.md#widget-item) | Showing \`Widget\` data | See the [data guide](how-to/data.md) and [ListView](controls/list-view.md) |

## Status

| Types | Use them for | Main behavior |
| --- | --- | --- |
| [Gauge](controls/gauge.md) | A reading | Value |
`;

const widgetApi = `\uFEFF# Widget

[C# API](../index.md) / [Fluence.Wpf.Controls](index.md)

- **Assembly:** \`Fluence.Wpf\`
- **Namespace:** \`Fluence.Wpf.Controls\`

\`\`\`csharp
public class Widget : System.Windows.Controls.Control
\`\`\`

Shows a widget. See [ListView](ListView.md).

**Remarks:** Widgets keep their state.



Use [Refresh](Widget.md#api-000000000003) after changes.

**Base type:** [\`System.Windows.Controls.Control\`](https://learn.microsoft.com/dotnet/api/system.windows.controls.control)

[C# source](https://github.com/sintaxasn/Fluence.Wpf/blob/main/Fluence.Wpf/Controls/Widget.cs)

## Constructors

<a id="api-000000000001"></a>

### Widget

\`\`\`csharp
public Widget()
\`\`\`

Initializes a new instance of the [Widget](Widget.md) class.

## Properties

<a id="api-000000000002"></a>

### Level

\`\`\`csharp
public int Level { get; set; }
\`\`\`

Gets or sets a value indicating whether the level | mode is shown.

## Methods

<a id="api-000000000003"></a>

### Refresh

\`\`\`csharp
public void Refresh()
\`\`\`

Refreshes the widget.

## Events

<a id="api-000000000004"></a>

### LevelChanged

\`\`\`csharp
public event EventHandler? LevelChanged
\`\`\`

Occurs when [Level](Widget.md#api-000000000002) changes.
`;

const widgetItemApi = `\uFEFF# WidgetItem

- **Namespace:** \`Fluence.Wpf.Controls\`

\`\`\`csharp
public class WidgetItem : System.Windows.Controls.ContentControl
\`\`\`

An item inside a [Widget](Widget.md).

**Base type:** [\`System.Windows.Controls.ContentControl\`](https://learn.microsoft.com/dotnet/api/system.windows.controls.contentcontrol)
`;

const roots = [];
after(() => roots.forEach((root) => fs.rmSync(root, { recursive: true, force: true })));

function makeDocs({ controls = catalog, files = {} } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fluence-control-pages-'));
  roots.push(root);
  const all = {
    'controls.md': controls,
    'controls/list-view.md': '\uFEFF# ListView\n\nAuthored guide.\n',
    'api/Fluence.Wpf.Controls/Widget.md': widgetApi,
    'api/Fluence.Wpf.Controls/WidgetItem.md': widgetItemApi,
    'winui-parity.md': '# Parity\n\n| Area | Note |\n| --- | --- |\n| Widgets | `Widget` differs. |\n',
    ...files,
  };
  for (const [relative, content] of Object.entries(all)) {
    const file = path.join(root, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return root;
}

const read = (root, relative) => fs.readFileSync(path.join(root, relative), 'utf8');

test('reads catalog rows, sections, and part anchors', () => {
  const entries = parseCatalog(catalog);
  const widget = entries.find((entry) => entry.slug === 'widget');
  assert.equal(widget.name, 'Widget');
  assert.equal(widget.section, 'Data and collections');
  assert.equal(widget.useFor, 'Showing `Widget` data');
  assert.equal(widget.detailHeader, 'Key detail');
  assert.deepEqual(widget.parts, [{ name: 'WidgetItem', fragment: 'widget-item' }]);
  assert.equal(entries.find((entry) => entry.slug === 'gauge').detailHeader, 'Main behavior');
});

test('reads the summary, remarks, source, and members of an API page', () => {
  const api = parseApiPage(widgetApi);
  assert.equal(api.namespace, 'Fluence.Wpf.Controls');
  assert.deepEqual(api.summary, ['Shows a widget. See [ListView](ListView.md).']);
  assert.deepEqual(api.remarks, ['Widgets keep their state.', 'Use [Refresh](Widget.md#api-000000000003) after changes.']);
  assert.equal(api.source, 'https://github.com/sintaxasn/Fluence.Wpf/blob/main/Fluence.Wpf/Controls/Widget.cs');
  assert.equal(api.sections.Properties[0].anchor, 'api-000000000002');
  assert.equal(api.sections.Events[0].signature, 'public event EventHandler? LevelChanged');
});

test('rebases relative links between docs files', () => {
  const from = 'api/Fluence.Wpf.Controls/Widget.md';
  assert.equal(rebaseLinks('[A](ListView.md#x)', from, 'controls/widget.md'), '[A](../api/Fluence.Wpf.Controls/ListView.md#x)');
  assert.equal(rebaseLinks('[A](../Fluence.Wpf/Enum.md)', from, 'controls/widget.md'), '[A](../api/Fluence.Wpf/Enum.md)');
  assert.equal(rebaseLinks('[A](controls/widget.md)', 'controls.md', 'controls/widget.md'), '[A](widget.md)');
  assert.equal(rebaseLinks('[A](../Demo/Page.xaml)', 'controls.md', 'controls/widget.md'), '[A](../../Demo/Page.xaml)');
  assert.equal(rebaseLinks('[A](https://example.com/x.md)', 'controls.md', 'controls/widget.md'), '[A](https://example.com/x.md)');
});

test('generates a marked guide for a catalog control without a page', () => {
  const root = makeDocs();
  const result = syncControlPages({ docsRoot: root });
  assert.deepEqual(result.written.sort(), ['controls/gauge.md', 'controls/widget.md']);
  const page = read(root, 'controls/widget.md');
  assert.ok(page.startsWith('\uFEFF# Widget\n\n<!-- '));
  assert.ok(page.includes(GENERATED_MARKER));
  assert.ok(!page.includes('\r'));
  assert.ok(page.endsWith('.md)\n'));
  assert.ok(page.includes('Shows a widget. See [ListView](../api/Fluence.Wpf.Controls/ListView.md).'));
  assert.ok(page.includes('| Use it for | Key detail |'));
  assert.ok(page.includes('| Showing `Widget` data | See the [data guide](../how-to/data.md) and [ListView](list-view.md) |'));
  assert.ok(page.includes('<fluence:Widget />'));
  assert.ok(page.includes('var widget = new Fluence.Wpf.Controls.Widget();'));
  assert.ok(page.includes('| [`Level`](../api/Fluence.Wpf.Controls/Widget.md#api-000000000002) | `int` | Whether the level \\| mode is shown. |'));
  assert.ok(page.includes('## State and behavior\n\nWidgets keep their state.\n\nUse [Refresh](../api/Fluence.Wpf.Controls/Widget.md#api-000000000003) after changes.'));
  assert.ok(page.includes('| [`LevelChanged`](../api/Fluence.Wpf.Controls/Widget.md#api-000000000004) | Occurs when [Level](../api/Fluence.Wpf.Controls/Widget.md#api-000000000002) changes. |'));
  assert.ok(page.includes('- [WinUI parity and differences](../winui-parity.md)'));
  assert.ok(page.includes('### WidgetItem {#widget-item}\n\nAn item inside a [Widget](../api/Fluence.Wpf.Controls/Widget.md).'));
  assert.ok(page.includes('- [Control source](../../Fluence.Wpf/Controls/Widget.cs)'));
  assert.ok(!page.includes('screenshots/'));
  assert.ok(!new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`).test(page));
});

test('writes only catalog content when no API page exists', () => {
  const root = makeDocs();
  syncControlPages({ docsRoot: root });
  const page = read(root, 'controls/gauge.md');
  assert.ok(page.includes('| Use it for | Main behavior |\n| --- | --- |\n| A reading | Value |'));
  assert.ok(!page.includes('## Example usage'));
  assert.ok(!page.includes('C# API reference'));
  assert.ok(page.includes('- [Control catalog](../controls.md)'));
});

test('leaves authored guides unchanged', () => {
  const root = makeDocs();
  const before = fs.readFileSync(path.join(root, 'controls/list-view.md'));
  const result = syncControlPages({ docsRoot: root });
  assert.ok(!result.written.includes('controls/list-view.md'));
  assert.deepEqual(fs.readFileSync(path.join(root, 'controls/list-view.md')), before);
});

test('treats a guide as generated only when the marker comment follows its title', () => {
  const prose = `# Gauge\n\nThis guide replaced its \`${GENERATED_MARKER}\` starter.\n`;
  const quoted = `# Old\n\nText.\n\n<!-- ${GENERATED_MARKER}: copied example -->\n`;
  const root = makeDocs({ files: { 'controls/gauge.md': prose, 'controls/old.md': quoted } });
  const result = syncControlPages({ docsRoot: root });
  assert.ok(!result.written.includes('controls/gauge.md'));
  assert.deepEqual(result.removed, []);
  assert.equal(read(root, 'controls/gauge.md'), prose);
  assert.equal(read(root, 'controls/old.md'), quoted);
  assert.ok(isGeneratedContent(read(root, 'controls/widget.md')));
  assert.ok(!isGeneratedContent(prose));
  assert.ok(!isGeneratedContent(quoted));
});

test('is idempotent, refreshes generated guides, and removes unlinked generated guides only', () => {
  const root = makeDocs({ files: { 'controls/old.md': '# Old\n\nAuthored and unlinked.\n' } });
  syncControlPages({ docsRoot: root });
  assert.deepEqual(syncControlPages({ docsRoot: root }).written, []);
  fs.writeFileSync(path.join(root, 'controls.md'), catalog.replace('| A reading | Value |', '| A new reading | Value |'));
  assert.deepEqual(syncControlPages({ docsRoot: root }).written, ['controls/gauge.md']);
  assert.ok(read(root, 'controls/gauge.md').includes('A new reading'));
  fs.writeFileSync(path.join(root, 'controls.md'), catalog.replace(/\| \[Gauge\].*\n/, ''));
  const result = syncControlPages({ docsRoot: root });
  assert.deepEqual(result.removed, ['controls/gauge.md']);
  assert.ok(!fs.existsSync(path.join(root, 'controls/gauge.md')));
  assert.ok(fs.existsSync(path.join(root, 'controls/old.md')));
});

test('dry run reports pages without writing them', () => {
  const root = makeDocs();
  assert.deepEqual(syncControlPages({ docsRoot: root, write: false }).written.sort(), ['controls/gauge.md', 'controls/widget.md']);
  assert.ok(!fs.existsSync(path.join(root, 'controls/widget.md')));
});

test('shows screenshots only when both themed captures exist', () => {
  const light = { 'screenshots/controls/widget-light.png': 'png' };
  const lightOnly = makeDocs({ files: light });
  syncControlPages({ docsRoot: lightOnly });
  assert.ok(!read(lightOnly, 'controls/widget.md').includes('screenshots/'));
  const both = makeDocs({ files: { ...light, 'screenshots/controls/widget-dark.png': 'png' } });
  syncControlPages({ docsRoot: both });
  assert.ok(read(both, 'controls/widget.md').includes(
    '| ![Widget in light mode](../screenshots/controls/widget-light.png) | ![Widget in dark mode](../screenshots/controls/widget-dark.png) |'));
});

test('adds unlisted catalog guides to the category of their catalog section', () => {
  const root = makeDocs();
  syncControlPages({ docsRoot: root });
  const sidebar = [
    { type: 'doc', id: 'controls' },
    { type: 'category', label: 'Collections', items: ['controls/list-view'] },
    { type: 'ref', id: 'csharp/usage' },
  ];
  addCatalogControls(sidebar, { docsRoot: root });
  assert.deepEqual(sidebar[1].items, ['controls/list-view', 'controls/widget']);
  assert.deepEqual(sidebar[2], { type: 'category', label: 'Status', items: ['controls/gauge'] });
  assert.deepEqual(sidebar[3], { type: 'ref', id: 'csharp/usage' });
});

test('leaves the sidebar alone for listed, missing, or unlisted guides', () => {
  const root = makeDocs({ files: { 'controls/gauge.md': '\uFEFF---\nunlisted: true\n---\n\n# Gauge\n' } });
  const sidebar = [{ type: 'category', label: 'Collections', items: ['controls/list-view'] }];
  const before = JSON.stringify(sidebar);
  addCatalogControls(sidebar, { docsRoot: root });
  assert.equal(JSON.stringify(sidebar), before);
});

test('never targets an authored guide in this site', () => {
  const result = syncControlPages({ docsRoot: realDocs, write: false });
  for (const page of [...result.written, ...result.removed]) {
    const file = path.join(realDocs, page);
    assert.ok(!fs.existsSync(file) || isGeneratedContent(fs.readFileSync(file, 'utf8')), page);
  }
});
