# PowerShell requirements

The module runs on Windows 10 version 1809 or later. It needs an interactive Windows desktop to show WPF windows.

| Host | Minimum version | Library build in the module |
| --- | --- | --- |
| Windows PowerShell (`powershell.exe`) | 5.1 | `net472` |
| PowerShell (`pwsh`) | 7.4 | `net8.0-windows10.0.26100.0` |

The module manifest accepts PowerShell 5.1 and later. PowerShell 7.0 through 7.3 can install the package, but importing it fails because the module requires PowerShell 7.4 or later.

A release package includes both library builds and does not require an SDK to use. Building the module from a repository checkout requires the .NET SDKs and build prerequisites described in the [module setup guide](../../Fluence.Wpf.PowerShell.Module/README.md).

The Windows 10 baseline supports the library's controls and dialogs. Mica and Tabbed backdrops require supported Windows 11 builds; the actual backdrop may fall back according to Windows capabilities and transparency settings. See [Windows and backdrop support](../csharp/requirements.md#windows-and-backdrop-support) and [appearance walkthrough](how-to/theming-at-runtime.md).
