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

CI uses Node.js 24 and pnpm 10.33.0. The package accepts Node.js 20 or newer; use Node.js 24 locally to match CI. From the repository root:

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

The site defaults to `https://fluencewpf.com/` with base path `/`; `FLUENCE_SITE_URL` and `FLUENCE_BASE_URL` remain available for intentional overrides. Keep these defaults for the production deployment.

### Planned hosting: Cloudflare Pages

After release approval, open **Workers & Pages > Create application > Pages > Import existing Git repository** in the Cloudflare dashboard, then select `Fluence.Wpf.Website`. Configure the project as follows:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | `website` |
| Build command | `pnpm build` |
| Build output directory | `build` |
| `NODE_VERSION` | `24` |
| `PNPM_VERSION` | `10.33.0` |
| Custom domain | `fluencewpf.com` |

Cloudflare Pages Git integration automatically builds branches and may publish preview deployments. Creating the integrated project can therefore make a public preview and, if `main` is selected and builds successfully, publish production content to its Pages hostname before the custom domain is attached. Defer project creation and Git integration until release approval. Then use the Pages project’s **Custom domains** workflow to attach `fluencewpf.com`. Because this is an apex domain, it must be an active Cloudflare zone with its nameservers pointed to Cloudflare; complete the DNS steps shown in the dashboard. Keep the Docusaurus URL and base path defaults above.

See Cloudflare's [Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/) and [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).

## C# walkthroughs and screenshots

The six C# lessons in `docs/csharp/usage.md` and `docs/how-to/` run from `samples/Fluence.Wpf.Docs.Walkthroughs/` on Windows with the .NET 10 SDK and PowerShell 7. The sample uses the bundled `Fluence.Wpf` `0.9.1` archive in `samples/Fluence.Wpf.Docs.Walkthroughs/packages/`. Its [provenance record](samples/Fluence.Wpf.Docs.Walkthroughs/packages/PROVENANCE.md) identifies the source commit and package hash. The package is a local documentation dependency; the website's Node build does not restore or run it.

From the website repository root, restore and build against the explicit local source, then run one example:

```powershell
pwsh ./samples/Fluence.Wpf.Docs.Walkthroughs/Build-Walkthroughs.ps1 -PackageSource ./samples/Fluence.Wpf.Docs.Walkthroughs/packages
dotnet run --project ./samples/Fluence.Wpf.Docs.Walkthroughs/Fluence.Wpf.Docs.Walkthroughs.csproj -c Release --no-build -- --example basic-usage
```

The other `--example` values are `window-and-title-bar`, `theme-and-accent`, `inputs-and-data`, `navigation-and-tabs`, and `dialogs-and-feedback`. The [sample README](samples/Fluence.Wpf.Docs.Walkthroughs/README.md) describes the windows and capture behavior. Its build script defaults to the bundled package folder; `-PackageSource <directory>` selects another local folder containing `Fluence.Wpf.0.9.1.nupkg`.

When a source change affects a walkthrough:

1. Build a `Fluence.Wpf.0.9.1.nupkg` from the intended Fluence.Wpf source checkout. It can be anywhere on disk. Review the source state and use `samples/Fluence.Wpf.Docs.Walkthroughs/Update-Package.ps1 -PackageFile <archive> -SourceCommit <sha> -SourceState <description>` to copy the archive and record its provenance. Review the changed package and `packages/PROVENANCE.md`.
2. Change the matching XAML window and code-behind in `samples/Fluence.Wpf.Docs.Walkthroughs/`. Compare the lesson's embedded XAML/C# excerpt with those files, then update its explanation and source links. The lessons use selected teaching excerpts, so inspect them manually rather than assuming exact whole-file equality.
3. Run the script below to restore, build, and capture all six windows in both themes. Review the 12 PNGs in `docs/screenshots/tutorials/` for layout, text, theme, and light/dark pairing. The capture uses a visible Windows desktop.

   ```powershell
   pwsh ./samples/Fluence.Wpf.Docs.Walkthroughs/Build-Walkthroughs.ps1 -PackageSource ./samples/Fluence.Wpf.Docs.Walkthroughs/packages -UpdateLockFile
   pwsh ./samples/Fluence.Wpf.Docs.Walkthroughs/Build-Walkthroughs.ps1 -PackageSource ./samples/Fluence.Wpf.Docs.Walkthroughs/packages -Capture
   ```

4. Run `pnpm typecheck`, `pnpm check:docs-transform`, and `pnpm build` from `website/`. Review the generated pages and links in both themes. The separate Windows walkthrough CI job also checks the sample build; the Node site build stays independent.

The sample's package version is pinned. When a newer version is intentionally adopted, update the sample package reference, local archive, lock file, scripts, provenance, and lesson commands together.

## Documentation and source code workflow

The website reads Markdown under `docs/`. The source repository owns `docs/api/`, `docs/powershell/reference/`, `docs/controls.md`, `docs/theming.md`, and `docs/winui-parity.md`; this repository contains synced copies of those paths. Other website documentation is authored here. Keep links relative where possible. Links to code, issues, and source documentation that live in the library repository should point to the source repository on GitHub.

For source changes that affect the docs, use a separate checkout of [Fluence.Wpf](https://github.com/sintaxasn/Fluence.Wpf):

- **C# API reference:** update source XML comments or the API generator in the code checkout. Generated `docs/api/` pages are synced here by the source repository's documentation workflow. Corrections belong in source comments or the generator.
- **PowerShell reference:** update the module's comment-based help in the code checkout. The source repository generates `docs/powershell/reference/` with Alt3.Docusaurus.Powershell and syncs it here. Remove obsolete `.md` pages when a generator replaces them with `.mdx` pages.
- **Source-authored guides:** update `docs/controls.md`, `docs/theming.md`, and `docs/winui-parity.md` in the code checkout; their copies are synced here.
- **Feature captures:** run the feature capture workflow in the code checkout on Windows, following its current `Capture-FeatureAnimations.ps1` instructions. Review the exported light and dark animations and posters, then copy the approved site images into `website/static/images/features/`. The capture requires a staged PowerShell module, a visible desktop, and FFmpeg; it cannot be run by the website build.
- **Other documentation:** edit the canonical pages in this repository when the change is website documentation. If the content describes source behavior, verify it against the code checkout before merging.

The backdrop capture uses this site's `website/static/images/features/backdrops-coronascape.webp` behind the live window. Use an unlocked interactive desktop and pass the image's absolute path to the source script with `-WallpaperPath` whenever the run includes backdrop variants. The Light GIF runs Light Mica -> Light Acrylic -> Dark Acrylic; the Dark GIF runs Dark Mica -> Dark Acrylic -> Light Acrylic. Each PNG poster shows settled Acrylic in its initial theme. The script records the wallpaper hash and capture geometry; it does not change the Windows desktop wallpaper. To refresh only these variants from the website repository root, run these commands sequentially:

```powershell
$wallpaper = (Resolve-Path 'website/static/images/features/backdrops-coronascape.webp').Path
$captureScript = 'C:\path\to\Fluence.Wpf\Fluence.Wpf.PowerShell.Module\build\Capture-FeatureAnimations.ps1'
powershell.exe -NoProfile -STA -ExecutionPolicy Bypass -File $captureScript -Only backdrops-light -WallpaperPath $wallpaper
powershell.exe -NoProfile -STA -ExecutionPolicy Bypass -File $captureScript -Only backdrops-dark -WallpaperPath $wallpaper
```

Review both source timelines for an active, visible window and wallpaper host before copying the approved `backdrops-{light,dark}.{gif,png}` files from the source checkout's `website/static/images/features/` into the matching paths here. Keep the website wallpaper and the capture's recorded wallpaper hash together when assessing provenance.

The current captures used wallpaper SHA-256 `AB2EFD87519EDB234A5ED04022EB4759A8FC665C2F664D342EC816FC3938432F`, library DLL SHA-256 `38CE9B56F478AE8BC0C0505D53CCFAC41AE8F2EF104C9F49A971BD7EC6A5EB41` built from source commit `827d74c976be5d705192fb68b54ca6d042d270b4`, and capture script SHA-256 `541E6DDBB6F4F25C1C5C223BC01A6E9CD793E73BD3127F52D5F6E657CABA3557` from capture commit `6d95efab544b4f69aa7a23309451e7d1973b8cbb`. The paired Light and Dark GIFs and posters were independently reviewed against their source timelines before import.

Review imports for complete light/dark pairs, correct links, and consistent filenames. The source checkout and this website repository have separate histories; do not assume relative paths between them.

## Navigation and theme

The website has Home, Features, Controls, C# Library, PowerShell, and About destinations. Controls, C# Library, and PowerShell use independent sidebars; use Docusaurus `ref` entries for cross-section navigation to preserve sidebar ownership.

Theme accents and typography are maintained in the website source. Keep accessible contrast, keyboard focus, narrow-screen layouts, theme changes, and reduced-motion behavior in scope for visual edits.

## Licensing and provenance

The Fluence.Wpf website source adapted from PSAppDeployToolkit is licensed under GNU LGPL version 2.1. Preserve the website's `LICENSE` and `NOTICE.md`, including upstream attribution and notices. The Fluence.Wpf documentation and project assets retain their BSD 3-Clause licensing; preserve their BSD license and attribution notices when importing them. These licenses apply to their respective materials and do not replace one another.

## Publishing

The planned production host is Cloudflare Pages using the configuration above. Project creation and Git integration are deferred until release approval because they can trigger public preview and production deployments. Publishing the website does not publish the WPF library, NuGet packages, or PowerShell Gallery packages.
