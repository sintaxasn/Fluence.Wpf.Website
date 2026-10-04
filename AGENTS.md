# Website contributor handbook

This handbook governs the Docusaurus site in `website/`, the canonical Markdown in `docs/`, and the website-owned WPF walkthrough sample in `samples/`. Shared media lives in `assets/`; site-only and imported feature captures live in `website/static/`. The [README](README.md) documents local development, walkthrough maintenance, and the separate-checkout import workflow.

## Product and navigation

The website serves WPF developers and PowerShell authors. Keep these top-level destinations:

1. Home: project overview and starting points. The navigation logo links here.
2. Features: illustrated capabilities, with links to practical documentation.
3. Controls: the control catalog and individual control guides, grouped by task.
4. C# Library: quickstart, requirements, installation, basic usage, walkthroughs, API reference, architecture, and contributing.
5. PowerShell: quickstart, requirements, installation, basic usage, controls and dialogs, walkthroughs, command reference, architecture, and contributing.
6. About: project author, purpose, license, and source links.

Controls, C# Library, and PowerShell have separate sidebars. Each document belongs to one sidebar. Use Docusaurus `ref` items for links across sections, so the link does not change the document's sidebar association. Keep API namespaces and command lists collapsed until selected. Preserve existing page URLs when reorganizing navigation.

## Source boundaries

- `website/src/pages/`: homepage, Features, and About pages.
- `website/src/css/custom.css`: shared visual tokens and documentation styling.
- `website/src/theme/`: focused Docusaurus theme overrides.
- `website/sidebars.js` and `website/docusaurus.config.js`: navigation, site metadata, and build configuration.
- `docs/`: website-authored Markdown and synced source documentation. Do not maintain a second website-only copy.
- `samples/Fluence.Wpf.Docs.Walkthroughs/`: website-owned runnable C# walkthroughs and their local package source. The sample project and its screenshot workflow are separate from the Node website build.
- `docs/api/` and `docs/powershell/reference/`: generated C# and PowerShell references synced from the code repository. Correct XML comments, comment-based help, or generators there; do not hand-edit generated pages here.
- `docs/controls.md`, `docs/theming.md`, and `docs/winui-parity.md`: authored in the code repository and synced here. Change their source copies first.
- `assets/`: shared documentation media. Keep provenance and applicable license notices when importing or changing assets.
- `website/build/`, `website/.docusaurus/`, and `website/node_modules/`: generated output; do not author files there.

The independent source repository is [Fluence.Wpf](https://github.com/sintaxasn/Fluence.Wpf). Do not assume a local sibling checkout or relative paths to it.

## Documentation

Use plain, neutral English. Keep tutorials, task guides, reference material, and architectural explanations distinct. Start beginner sections with a working path, then link to details. Verify API names, parameters, framework support, and package status against the source repository. Do not describe planned integrations as shipped functionality.

Keep Markdown links relative where they resolve within this repository. Use explicit GitHub source links for material maintained in the code repository. Use UTF-8 with BOM, LF endings, and a final newline. Do not use em or en dash characters. C# examples may pair XAML first and C# second in tabs. PowerShell examples stay in their own section. Include practical examples and relevant screenshots on control pages. Never imply public package availability before publication is approved.

### Importing API reference and feature media

Website changes may need outputs generated from the separate Fluence.Wpf code checkout. The website build does not generate these artifacts.

- For C# API changes, update XML documentation or its generator in the code checkout. Its documentation workflow regenerates `docs/api/` and syncs reviewed output here; check links and navigation.
- For PowerShell command reference changes, update comment-based help in the code checkout. Its Alt3.Docusaurus.Powershell workflow regenerates `docs/powershell/reference/` and syncs output here.
- For feature animations or posters, use the code checkout's `Capture-FeatureAnimations.ps1` workflow on Windows. It stages the module and captures the actual WPF UI. Review outputs and copy the approved website files into `website/static/images/features/`.
- Keep paired light and dark images together, preserve filenames expected by the page, and retain relevant BSD attribution and notices for imported documentation and assets.
- C# tutorial screenshots come from the website-owned walkthrough sample. After changing a sample, update the corresponding XAML/C# excerpt and explanation in `docs/`, run the sample build and capture script against its explicit local package source, inspect the new light and dark images, and then run the website gates below. The [README](README.md) gives the command sequence. Do not assume the source repository is a sibling checkout.

Do not run code-repository generators against this repository or substitute screenshots from a different build. Record the source commit when an imported API or feature asset update needs clear provenance.

## Visual system

Use the existing Fluence assets. Navigation shows the standalone logomark with a 16 px left inset. Light and dark images follow the selected theme; the homepage hero uses the matching themed lockup, while the gallery screenshots retain their layered presentation. The first four Features sections have separate light and dark GIFs for controls, themes, accent colors, and window backdrops, with matching themed still images when reduced motion is preferred. If animated backdrop capture cannot show the effects reliably, use themed Acrylic still images for that section. The animations have no playback button. Control captures show the control with breathing room. Showcase images sit directly on the page background.

Accents come from resolved `DesignTime.Light.xaml` and `DesignTime.Dark.xaml` palettes imported from the source repository. Website headings and body text use locally bundled Nebula Sans; code uses JetBrains Mono. Motion follows the adapted upstream design. Reuse CSS tokens and existing motion patterns, respect reduced motion, and keep content accessible when JavaScript is unavailable. Check keyboard focus, narrow screens, and theme changes after visual edits.

## Copyright and licensing

The visible website copyright names **Dan Cunningham**. Preserve the BSD 3-Clause license for Fluence documentation and assets, including imported source docs where applicable. Preserve the separate upstream notices for adapted website source in `website/LICENSE` and `website/NOTICE.md`. Do not replace third-party licensing with the Fluence copyright, and do not assume one license relicenses the other materials.

## Build and review

Use the Node and pnpm versions in `website/package.json`. The Docusaurus build remains independent of the Windows/.NET walkthrough capture workflow. From `website/`:

```powershell
pnpm typecheck
pnpm check:docs-transform
pnpm build
pnpm serve
```

If the pnpm shim is unavailable, use `corepack pnpm@10.33.0` with the same arguments. The production build checks documentation links and anchors. Run tests only when requested; do not describe a build or visual review as test-suite coverage.

After authoring, perform a separate review of navigation, technical claims, examples, and links. Inspect desktop and mobile layouts in both themes. Report what was checked and any limitations. Preserve unrelated working-tree edits.

## Publishing

Publishing is not configured by this handbook. Confirm and review the deployment setup for this standalone repository before any publication. Keep deployment changes separate from local build validation. Website publication does not authorize or trigger a NuGet or PowerShell Gallery release.

Commits and public publication require the user's explicit authorization. Keep the branch, commit summary, and preview reviewable before publication.
