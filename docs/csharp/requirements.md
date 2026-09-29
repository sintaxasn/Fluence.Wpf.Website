# Requirements and compatibility

Fluence.Wpf is a Windows Presentation Foundation library. The supported target frameworks are:

| Target | Intended use |
| --- | --- |
| `net472` | .NET Framework 4.7.2 WPF applications |
| `net8.0-windows10.0.26100.0` | .NET 8 WPF applications on Windows |
| `net10.0-windows10.0.26100.0` | .NET 10 WPF applications on Windows |

Windows 10 version 1809 is the operating system baseline. Core controls, themes, and high contrast resources run there. Mica, Tabbed, DWM Acrylic, and DWM rounded corners depend on supported Windows 11 capabilities. On Windows 10, backdrop requests use the available legacy acrylic path when allowed or an opaque fallback. High contrast uses an opaque surface.

`WindowBackdropType` records a request; Windows version, theme, and transparency settings determine the effective appearance. The library is implemented in WPF and does not require the Windows App SDK or WinUI runtime in a consuming application. Your application still needs the runtime appropriate to its target framework.

The gallery targets `net472` and .NET 10, and the MVVM sample targets .NET 10. See [known issues](../../KNOWN_ISSUES.md) for accepted platform gaps. The PowerShell module has a distinct runtime matrix documented in [its requirements](../powershell/requirements.md). Continue with [installation](installation.md).
