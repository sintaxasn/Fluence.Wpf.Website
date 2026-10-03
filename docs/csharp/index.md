# Introduction to the C# library

Fluence.Wpf brings Windows 11 style controls, themes, and window chrome to WPF. It uses WPF controls and templates, so existing bindings, commands, and application structure remain familiar. You can adopt one control or build a complete Fluent window.

Start with [requirements](requirements.md), then [set up a local package or project reference](installation.md) and [build a small app](usage.md). The [gallery](gallery.md) lets you inspect live examples and their source. The [control catalog](../controls.md) and [API reference](../api/index.md) cover specific types and members.

The library targets .NET Framework 4.7.2, .NET 8 for Windows, and .NET 10 for Windows. Its Windows baseline is Windows 10 version 1809. Windows 11 features such as Mica are requested when the operating system supports them; see [requirements](requirements.md) for fallback behavior.

The library is available under the [BSD 3-Clause license](license.md). A consuming WPF application does not need the Windows App SDK or WinUI runtime.
