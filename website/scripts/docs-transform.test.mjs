import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { transformTree } from '../plugins/docs-transform.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const docs = path.resolve(here, '../../docs');
const repository = 'https://github.com/sintaxasn/Fluence.Wpf';
const image = (url, alt) => ({ type: 'image', url, alt });
const paragraph = (...children) => ({ type: 'paragraph', children });
const root = (...children) => ({ type: 'root', children });
const run = (tree, file = 'getting-started.md') => transformTree(tree, path.join(docs, file), repository);
const wrappedImage = (node) => {
  assert.equal(node.type, 'mdxJsxTextElement');
  assert.equal(node.name, 'span');
  assert.equal(node.children[0].type, 'image');
  return node.children[0];
};

test('converts adjacent light and dark paragraphs to one visible slot', () => {
  const tree = run(root(
    paragraph(image('screenshots/gallery/home-light.png', 'Home light')),
    paragraph(image('screenshots/gallery/home-dark.png', 'Home dark')),
  ));
  assert.equal(tree.children.length, 1);
  assert.equal(tree.children[0].children.length, 3);
  assert.equal(tree.children[0].children[0].attributes[0].value, 'fluence-theme-image--light');
  assert.equal(tree.children[0].children[2].attributes[0].value, 'fluence-theme-image--dark');
  assert.equal(wrappedImage(tree.children[0].children[2]).alt, 'Home dark');
});

test('tags both images when the pair shares a paragraph', () => {
  const tree = run(root(paragraph(
    image('screenshots/gallery/home-light.png', 'Light home'),
    { type: 'text', value: ' / ' },
    image('screenshots/gallery/home-dark.png', 'Dark home'),
  )));
  const images = tree.children[0].children.filter((node) => node.type === 'mdxJsxTextElement');
  assert.equal(images.length, 2);
  assert.equal(images[0].attributes[0].value, 'fluence-theme-image--light');
  assert.equal(images[1].attributes[0].value, 'fluence-theme-image--dark');
});

test('replaces a light and dark screenshot table with images below its heading', () => {
  const table = { type: 'table', align: [null, null], children: [
    { type: 'tableRow', children: [
      { type: 'tableCell', children: [{ type: 'text', value: 'Light' }] },
      { type: 'tableCell', children: [{ type: 'text', value: 'Dark' }] },
    ] },
    { type: 'tableRow', children: [
      { type: 'tableCell', children: [image('../screenshots/gallery/layout-sample-01-light.png', 'Light layout')] },
      { type: 'tableCell', children: [image('../screenshots/gallery/layout-sample-01-dark.png', 'Dark layout')] },
    ] },
  ] };
  const heading = { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Gallery screenshots' }] };
  const tree = run(root(heading, table), 'controls/border.md');
  assert.equal(tree.children.length, 2);
  assert.equal(tree.children[0], heading);
  assert.equal(tree.children[1].type, 'paragraph');
  assert.equal(tree.children[1].children.length, 3);
  assert.equal(tree.children[1].children[0].attributes[0].value, 'fluence-theme-image--light');
  assert.equal(tree.children[1].children[2].attributes[0].value, 'fluence-theme-image--dark');
  assert.equal(wrappedImage(tree.children[1].children[0]).url, '../screenshots/gallery/layout-sample-01-light.png');
});

test('preserves tables with data or mixed image and text cells', () => {
  const dataTable = { type: 'table', children: [
    { type: 'tableRow', children: [
      { type: 'tableCell', children: [{ type: 'text', value: 'Property' }] },
      { type: 'tableCell', children: [{ type: 'text', value: 'Value' }] },
    ] },
    { type: 'tableRow', children: [
      { type: 'tableCell', children: [{ type: 'text', value: 'Glyph' }] },
      { type: 'tableCell', children: [{ type: 'text', value: 'E8E5' }] },
    ] },
  ] };
  const mixedTable = { type: 'table', children: [
    { type: 'tableRow', children: [
      { type: 'tableCell', children: [{ type: 'text', value: 'Light' }] },
      { type: 'tableCell', children: [{ type: 'text', value: 'Dark' }] },
    ] },
    { type: 'tableRow', children: [
      { type: 'tableCell', children: [image('../screenshots/gallery/layout-sample-01-light.png', 'Light layout')] },
      { type: 'tableCell', children: [{ type: 'text', value: 'Unavailable' }] },
    ] },
  ] };
  const tree = run(root(dataTable, mixedTable), 'controls/border.md');
  assert.equal(tree.children[0], dataTable);
  assert.equal(tree.children[1], mixedTable);
  assert.equal(dataTable.children[0].children[0].children[0].value, 'Property');
  assert.equal(mixedTable.children[0].children[0].children[0].value, 'Light');
});

test('adds an existing counterpart to a lone screenshot', () => {
  const tree = run(root(paragraph(image('screenshots/gallery/home-light.png', 'Home in light mode'))));
  const images = tree.children[0].children.filter((node) => node.type === 'mdxJsxTextElement');
  assert.equal(images.length, 2);
  assert.equal(wrappedImage(images[1]).url, 'screenshots/gallery/home-dark.png');
  assert.equal(wrappedImage(images[1]).alt, 'Home in dark mode');
});

test('tags unpaired theme screenshots without adding an unrelated accent counterpart', () => {
  const tree = run(root(paragraph(
    image('screenshots/gallery/buttons-light-accent-blue.png', 'Blue accent'),
    { type: 'text', value: ' versus ' },
    image('screenshots/gallery/buttons-light-accent-orange.png', 'Orange accent'),
  )));
  assert.equal(tree.children[0].children.length, 3);
  assert.equal(tree.children[0].children[0].attributes[0].value, 'fluence-theme-image--light');
  assert.equal(tree.children[0].children[2].attributes[0].value, 'fluence-theme-image--light');
});

test('tags different light and dark accent screenshots in separate paragraphs', () => {
  const tree = run(root(
    paragraph(image('../images/accent-purple-light.png', 'Purple accent in light mode')),
    paragraph(image('../images/accent-green-dark.png', 'Green accent in dark mode')),
  ), 'powershell/how-to/theming-at-runtime.md');
  assert.equal(tree.children.length, 2);
  assert.equal(tree.children[0].children[0].attributes[0].value, 'fluence-theme-image--light');
  assert.equal(tree.children[1].children[0].attributes[0].value, 'fluence-theme-image--dark');
  assert.equal(wrappedImage(tree.children[0].children[0]).url, '../images/accent-purple-light.png');
  assert.equal(wrappedImage(tree.children[1].children[0]).url, '../images/accent-green-dark.png');
});

test('leaves an unthemed image unchanged', () => {
  const tree = run(root(paragraph(image('images/architecture.png', 'Architecture'))));
  assert.equal(tree.children[0].children.length, 1);
  assert.equal(tree.children[0].children[0].type, 'image');
  assert.equal(tree.children[0].children[0].data, undefined);
});

test('rewrites repository links while preserving doc links and image paths', () => {
  const tree = run(root(paragraph(
    { type: 'link', url: '../KNOWN_ISSUES.md#open-issues', children: [{ type: 'text', value: 'Issues' }] },
    { type: 'link', url: 'controls.md', children: [{ type: 'text', value: 'Controls' }] },
    image('screenshots/gallery/home-light.png', 'Home'),
  )));
  assert.equal(tree.children[0].children[0].url, `${repository}/blob/main/KNOWN_ISSUES.md#open-issues`);
  assert.equal(tree.children[0].children[1].url, 'controls.md');
  assert.equal(wrappedImage(tree.children[0].children[2]).url, 'screenshots/gallery/home-light.png');
});
