# Running the Gallery

The Fluence.Wpf Gallery is the quickest way to inspect controls, theme states, and working XAML and C# examples. Its pages demonstrate window chrome, navigation, inputs, dialogs, and layout. The [control catalog](../controls.md) links individual examples.

## Download a release

Open the project's [GitHub Releases](https://github.com/sintaxasn/Fluence.Wpf/releases), choose a release with a Gallery asset, download and extract the archive, then run the Gallery executable included in that asset. Check the release notes for its target framework and runtime requirements. Release assets can vary, so use the instructions attached to the selected release.

## Build from source

Clone the repository and build the Gallery project for a framework installed on your Windows machine:

```powershell
git clone https://github.com/sintaxasn/Fluence.Wpf.git
cd Fluence.Wpf
dotnet build Fluence.Wpf.Demo/Fluence.Wpf.Demo.csproj -c Release -f net10.0-windows10.0.26100.0
dotnet run --project Fluence.Wpf.Demo/Fluence.Wpf.Demo.csproj -c Release -f net10.0-windows10.0.26100.0
```

The Gallery also targets `net472`; select that target if you are developing with .NET Framework 4.7.2. Its project source is in [`Fluence.Wpf.Demo`](../../Fluence.Wpf.Demo/). Browse the page XAML and code-behind beside the running example, or follow the source links on a control guide. Build and run the app on Windows, where WPF and the Windows visual effects are available.
