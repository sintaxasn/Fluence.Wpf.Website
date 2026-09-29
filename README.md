# Fluence.Wpf website and documentation

This repository contains the Fluence.Wpf public website, its Markdown documentation, and the assets used by those pages. It is independent of the [Fluence.Wpf source repository](https://github.com/sintaxasn/Fluence.Wpf). The website does not build the WPF library and does not publish NuGet or PowerShell Gallery packages.

## Repository layout

```text
Fluence.Wpf.Website/
├── website/    Docusaurus source, configuration, and site-specific static files
├── docs/       Website documentation and synced source reference pages
└── assets/     Shared documentation and website assets
```

Do not copy documentation into Docusaurus plugin directories. The site reads Markdown from `../docs` and shared images from `../assets`; files under `website/static/` are reserved for site-specific assets and generated feature captures.

## Prerequisites and local development

Use Node.js 24 and pnpm 10.33.0, matching the versions declared in `website/package.json`. From the repository root:

```powershell
Set-Location website
pnpm install --frozen-lockfile
pnpm start
```

The local server prints its address. If the pnpm shim is unavailable, use Corepack with the pinned release, for example `corepack pnpm@10.33.0 install --frozen-lockfile` and `corepack pnpm@10.33.0 start`.

To check and build the site from `website/`:

```powershell
pnpm typecheck
pnpm check:docs-transform
pnpm build
pnpm serve
```

The production build checks documentation links and anchors. `pnpm check:docs-transform` covers the custom Markdown transform only; it is not a site-wide link check. Website builds do not require .NET or the WPF source checkout.

The site defaults to `https://fluencewpf.com/`. `FLUENCE_SITE_URL` and `FLUENCE_BASE_URL` can override the URL and base path for another hosting environment. The domain also appears in `website/static/CNAME` for GitHub Pages; DNS and the repository's Pages custom-domain setting must be configured separately.

## Documentation and source code workflow

The website reads Markdown under `docs/`. The source repository owns `docs/api/`, `docs/powershell/reference/`, `docs/controls.md`, `docs/theming.md`, and `docs/winui-parity.md`; this repository contains synced copies of those paths. Other website documentation is authored here. Keep links relative where possible. Links to code, issues, and source documentation that live in the library repository should point to its GitHub pages.

For source changes that affect the docs, use a separate checkout of [Fluence.Wpf](https://github.com/sintaxasn/Fluence.Wpf):

- **C# API reference:** update source XML comments or the API generator in the code checkout. Generated `docs/api/` pages are synced here by the source repository's documentation workflow. Corrections belong in source comments or the generator.
- **PowerShell reference:** update the module's comment-based help in the code checkout. The source repository generates `docs/powershell/reference/` with Alt3.Docusaurus.Powershell and syncs it here. Remove obsolete `.md` pages when a generator replaces them with `.mdx` pages.
- **Source-authored guides:** update `docs/controls.md`, `docs/theming.md`, and `docs/winui-parity.md` in the code checkout; their copies are synced here.
- **Feature captures:** run the feature capture workflow in the code checkout on Windows, following its current `Capture-FeatureAnimations.ps1` instructions. Review the exported light and dark animations and posters, then copy the approved site images into `website/static/images/features/`. The capture requires a staged PowerShell module, a visible desktop, and FFmpeg; it cannot be run by the website build.
- **Other documentation:** edit the canonical pages in this repository when the change is website documentation. If the content describes source behavior, verify it against the code checkout before merging.

Review imports for complete light/dark pairs, correct links, and consistent filenames. The source checkout and this website repository have separate histories; do not assume relative paths between them.

## Navigation and theme

The website has Home, Features, Controls, C# Library, PowerShell, and About destinations. Controls, C# Library, and PowerShell use independent sidebars; use Docusaurus `ref` entries for cross-section navigation to preserve sidebar ownership.

Theme accents and typography are maintained in the website source. Keep accessible contrast, keyboard focus, narrow-screen layouts, theme changes, and reduced-motion behavior in scope for visual edits.

## Licensing and provenance

The Fluence.Wpf website source adapted from PSAppDeployToolkit is licensed under GNU LGPL version 2.1. Preserve the website's `LICENSE` and `NOTICE.md`, including upstream attribution and notices. The Fluence.Wpf documentation and project assets retain their BSD 3-Clause licensing; preserve their BSD license and attribution notices when importing them. These licenses apply to their respective materials and do not replace one another.

## Publishing

Publishing configuration must be reviewed and explicitly set up for this standalone repository. Until that is done, treat the site as a locally buildable project only. Publishing the website does not publish the WPF library, NuGet packages, or PowerShell Gallery packages.
