# Running the Gallery

The Fluence.Wpf Gallery is the quickest way to inspect controls, theme states, and working XAML and C# examples. Its pages demonstrate window chrome, navigation, inputs, dialogs, and layout. The [control catalog](../controls.md) links individual examples.

## Download a release

For version 0.9.4, the Gallery asset is `Fluence.Wpf.Demo-v0.9.4-net472.zip`, targeting .NET Framework 4.7.2. Open the project's [GitHub Releases](https://github.com/sintaxasn/Fluence.Wpf/releases), choose a release with a Gallery asset, download and extract the archive, then run the Gallery executable included in that asset. Check the release notes for its target framework and runtime requirements. Release assets can vary, so use the instructions attached to the selected release.

## Build from source

Clone the repository and build the Gallery project for a framework installed on your Windows machine:

```powershell
git clone https://github.com/sintaxasn/Fluence.Wpf.git
cd Fluence.Wpf
dotnet build Fluence.Wpf.Demo/Fluence.Wpf.Demo.csproj -c Release -f net10.0-windows10.0.26100.0
dotnet run --project Fluence.Wpf.Demo/Fluence.Wpf.Demo.csproj -c Release -f net10.0-windows10.0.26100.0
```

The Gallery also targets `net472`; select that target if you are developing with .NET Framework 4.7.2. Its project source is in [`Fluence.Wpf.Demo`](../../Fluence.Wpf.Demo/). Browse the page XAML and code-behind beside the running example, or follow the source links on a control guide. Build and run the app on Windows, where WPF and the Windows visual effects are available.

The Gallery home page in light and dark themes:

![Gallery home in light mode](../screenshots/gallery/home-light.png)

![Gallery home in dark mode](../screenshots/gallery/home-dark.png)

## Mica color examples

Backdrop materials are window-level in this WPF library; WPF does not provide WinUI's `SystemBackdropElement` for a per-element material. The Colors gallery's Layer on Mica Base Alt example makes its row and sample card transparent so the existing window backdrop shows through the canonical overlay brushes. This is a gallery-only approximation of the layered appearance, not an isolated Mica Alt material; the opaque Tertiary brush remains neutral, and the shared brushes are unchanged.

The Colors gallery also includes a Mica Background group after Solid Background. Its Base and Base Alt examples use the existing solid fallback brushes, `SolidBackgroundFillColorBaseBrush` and `SolidBackgroundFillColorBaseAltBrush`, because WPF applies Mica to the whole window rather than to individual tiles. The copy actions provide the valid window settings `SystemBackdropType="Mica"` and `SystemBackdropType="Tabbed"`; they do not identify brush resources or create a per-element backdrop. The examples link to Microsoft's [SystemBackdrop](https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.systembackdrop?view=windows-app-sdk-2.0) and [SystemBackdropElement](https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.systembackdropelement?view=windows-app-sdk-2.0) references.
