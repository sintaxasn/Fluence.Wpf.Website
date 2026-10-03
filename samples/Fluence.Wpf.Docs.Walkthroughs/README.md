# Runnable C# walkthroughs

This Windows WPF sample accompanies the website's C# lessons. It builds against the bundled `Fluence.Wpf` `0.9.1-pre` package. The website's Node build does not build or run this project.

From the website repository root, restore and build with PowerShell 7:

```powershell
pwsh ./samples/Fluence.Wpf.Docs.Walkthroughs/Build-Walkthroughs.ps1
```

The script passes the local `packages/` directory as the explicit NuGet source, checks its SHA256 against `packages/PROVENANCE.md`, restores in locked mode, and keeps its package cache under `obj/`. To build against another local feed, pass `-PackageSource <directory>` containing `Fluence.Wpf.0.9.1-pre.nupkg`. The package has not been published publicly. After intentionally changing the bundled package, run `Build-Walkthroughs.ps1 -UpdateLockFile` once to refresh `packages.lock.json`, then use the default locked restore to verify it.

Run one window after building:

```powershell
dotnet run --project ./samples/Fluence.Wpf.Docs.Walkthroughs/Fluence.Wpf.Docs.Walkthroughs.csproj -c Release --no-build -- --example basic-usage
```

The default also opens `basic-usage`. Other slugs are `window-and-title-bar`, `theme-and-accent`, `inputs-and-data`, `navigation-and-tabs`, and `dialogs-and-feedback`. Each example uses one XAML window and one code-behind file.

To rebuild and capture all six examples in light and dark themes:

```powershell
pwsh ./samples/Fluence.Wpf.Docs.Walkthroughs/Build-Walkthroughs.ps1 -Capture
```

The 12 PNGs are written to `docs/screenshots/tutorials/` in this repository. Capture mode sets a fixed blue accent and opaque backdrop for repeatability. Native DWM backdrop pixels, rounded edges, and exterior shadows are composed outside WPF and do not appear in these images.

To replace the bundled package with a newly built archive, run `Update-Package.ps1` with its source path, source commit, and source state. Then run the build script. The package hash changes the isolated NuGet cache path, so an archive rebuilt with the same version does not reuse stale cached bytes.
