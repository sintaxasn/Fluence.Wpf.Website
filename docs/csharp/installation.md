# Install Fluence.Wpf in a project

The package ID is `Fluence.Wpf`. NuGet publication is planned. Once the package appears on your configured feed, you can install it with the .NET CLI, Visual Studio NuGet Package Manager, or Package Manager Console. The repository currently declares version `0.9.0-pre`; use the version shown on the feed if it differs.

```powershell
dotnet package add Fluence.Wpf --version 0.9.0-pre --project YourApp.csproj
```

The `dotnet package add` form uses the .NET 10 SDK. With the .NET 9 SDK or earlier, use `dotnet add YourApp.csproj package Fluence.Wpf --version 0.9.0-pre`. See the [Microsoft CLI reference](https://learn.microsoft.com/dotnet/core/tools/dotnet-package-add).

In Visual Studio, open **Manage NuGet Packages** for the WPF project, search for **Fluence.Wpf**, choose a version, and install. In Package Manager Console:

```powershell
Install-Package Fluence.Wpf -Version 0.9.0-pre -ProjectName YourApp
```

For a source checkout, use either of the local paths below. After installing, [build a first app](usage.md).

## Reference the project in this repository

From the repository root, add a project reference to your WPF application:

```powershell
dotnet add path/to/YourApp.csproj reference Fluence.Wpf/Fluence.Wpf.csproj
```

## Build a local NuGet package

Pack the current repository prerelease and add it to your application:

```powershell
dotnet pack Fluence.Wpf/Fluence.Wpf.csproj -c Release -o ./artifacts
$packageSource = (Resolve-Path ./artifacts).Path
dotnet add path/to/YourApp.csproj package Fluence.Wpf --version 0.9.0-pre --no-restore
dotnet restore path/to/YourApp.csproj --source $packageSource --source https://api.nuget.org/v3/index.json
```

The Fluence package comes from the local output directory. The additional source lets NuGet resolve its package dependencies; use your configured dependency feed instead if required by your environment.

## Initialize resources

Call `ApplicationThemeManager.Apply` before showing the first window. The manager loads computed theme resources and control templates. Do not merge `Generic.xaml` yourself. See [Basic Usage](usage.md) for a complete example and [Theme Resources](../theming.md) for resource usage.
