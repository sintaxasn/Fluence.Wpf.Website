# Install the PowerShell module

The module's PowerShell Gallery publication is planned. Use a release ZIP when one is available, or stage the module from a source checkout today.

## Release ZIP

Download a PowerShell module ZIP from the project's [GitHub Releases](https://github.com/sintaxasn/Fluence.Wpf/releases) when it is published. Extract the `Fluence.Wpf.PowerShell` folder under a directory in `$env:PSModulePath`. The folder must contain `Fluence.Wpf.PowerShell.psd1` and both `lib` builds. Then run:

```powershell
Import-Module Fluence.Wpf.PowerShell
Get-Command -Module Fluence.Wpf.PowerShell
```

You can also import the manifest by its full path when you do not want to copy the folder into a module path.

## Source checkout

From the repository root, stage the required library builds and import the manifest:

```powershell
pwsh -NoProfile -File .\Fluence.Wpf.PowerShell.Module\build\Build-Module.ps1 -Build
Import-Module .\Fluence.Wpf.PowerShell.Module\src\Fluence.Wpf.PowerShell\Fluence.Wpf.PowerShell.psd1
```

The [module setup guide](../../Fluence.Wpf.PowerShell.Module/README.md) covers build prerequisites and packaging.

## PowerShell Gallery, after publication

Once the package is published to PowerShell Gallery, install it for your account with:

```powershell
Install-Module -Name Fluence.Wpf.PowerShell -Repository PSGallery -Scope CurrentUser
Import-Module Fluence.Wpf.PowerShell
```

For a published prerelease, PowerShellGet 2.x supports `-AllowPrerelease`. Check that the version you intend to use is available in your configured repository before installing it.

Continue with [Basic Usage](usage.md).