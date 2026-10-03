# Install Fluence.Wpf in a project

The package ID is `Fluence.Wpf`. This checkout prepares version `0.9.1-pre`; NuGet publication has not been confirmed. Build a local package from source today, or use the commands below once the package appears on your configured feed. Use the version shown on the feed if it differs.

```powershell
dotnet package add Fluence.Wpf --version 0.9.1-pre --project YourApp.csproj
```

The `dotnet package add` form uses the .NET 10 SDK. With the .NET 9 SDK or earlier, use `dotnet add YourApp.csproj package Fluence.Wpf --version 0.9.1-pre`. See the [Microsoft CLI reference](https://learn.microsoft.com/dotnet/core/tools/dotnet-package-add).

In Visual Studio, open **Manage NuGet Packages** for the WPF project, search for **Fluence.Wpf**, choose a version, and install. In Package Manager Console:

```powershell
Install-Package Fluence.Wpf -Version 0.9.1-pre -ProjectName YourApp
```

For a source checkout, clone the [Fluence.Wpf library repository](https://github.com/sintaxasn/Fluence.Wpf) separately from this website. Run the local commands below from the library checkout root, with `$appProject` set to the actual path of your WPF application's `.csproj` file. If you already have the library checkout, use it instead of cloning again.

```powershell
git clone https://github.com/sintaxasn/Fluence.Wpf.git
Set-Location ./Fluence.Wpf
$appProject = 'C:\path\to\YourApp\YourApp.csproj' # Replace with your app's actual project path.
```

After adding the reference or package, [build a first app](usage.md).

## Reference the library project

From the library checkout root, add a project reference to your WPF application:

```powershell
dotnet add $appProject reference ./Fluence.Wpf/Fluence.Wpf.csproj
```

## Build a local NuGet package

Pack the library checkout prerelease and add it to your application:

```powershell
dotnet pack ./Fluence.Wpf/Fluence.Wpf.csproj -c Release -o ./artifacts
$packageSource = (Resolve-Path ./artifacts).Path
dotnet add $appProject package Fluence.Wpf --version 0.9.1-pre --no-restore
dotnet restore $appProject --source $packageSource --source https://api.nuget.org/v3/index.json
```

The Fluence package comes from the local output directory. The additional source lets NuGet resolve its package dependencies; use your configured dependency feed instead if required by your environment.

## Initialize resources

Call `ApplicationThemeManager.Apply` before showing the first window. The manager loads computed theme resources and control templates. Do not merge `Generic.xaml` yourself. See [Basic walkthrough](usage.md) for a complete example and [Theme Resources](../theming.md) for resource usage.
