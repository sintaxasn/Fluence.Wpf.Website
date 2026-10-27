# Install the PowerShell module

The module is published on [PowerShell Gallery](https://www.powershellgallery.com/packages/Fluence.Wpf.PowerShell) as `Fluence.Wpf.PowerShell`. Each release also attaches a module ZIP to the project's [GitHub Releases](https://github.com/sintaxasn/Fluence.Wpf/releases). Install from PowerShell Gallery unless you need an offline copy or unreleased changes.

## PowerShell Gallery

Install the latest stable release for your account:

```powershell
Install-Module -Name Fluence.Wpf.PowerShell -Repository PSGallery -Scope CurrentUser
Import-Module Fluence.Wpf.PowerShell
```

For a prerelease, PowerShellGet 2.x supports `-AllowPrerelease` on `Install-Module`.

## Release ZIP

Download `Fluence.Wpf.PowerShell-<version>.zip` from the project's [GitHub Releases](https://github.com/sintaxasn/Fluence.Wpf/releases). Extract the `Fluence.Wpf.PowerShell` folder under a directory in `$env:PSModulePath`. The folder must contain `Fluence.Wpf.PowerShell.psd1` and both `lib` builds. Then run:

```powershell
Import-Module Fluence.Wpf.PowerShell
Get-Command -Module Fluence.Wpf.PowerShell
```

You can also import the manifest by its full path when you do not want to copy the folder into a module path.

## Source checkout

To use unreleased changes, stage the required library builds from the root of a [Fluence.Wpf](https://github.com/sintaxasn/Fluence.Wpf) checkout and import the manifest:

```powershell
pwsh -NoProfile -File .\Fluence.Wpf.PowerShell.Module\build\Build-Module.ps1 -Build
Import-Module .\Fluence.Wpf.PowerShell.Module\src\Fluence.Wpf.PowerShell\Fluence.Wpf.PowerShell.psd1
```

The [module setup guide](../../Fluence.Wpf.PowerShell.Module/README.md) covers build prerequisites and packaging.

Continue with [Basic Usage](usage.md).
