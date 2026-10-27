# Install Fluence.Wpf in a project

Fluence.Wpf is published on [nuget.org](https://www.nuget.org/packages/Fluence.Wpf) with the package ID `Fluence.Wpf`. Add the latest stable release to your WPF application project:

```powershell
dotnet package add Fluence.Wpf --project YourApp.csproj
```

The `dotnet package add` form uses the .NET 10 SDK. With the .NET 9 SDK or earlier, use `dotnet add YourApp.csproj package Fluence.Wpf`. Add `--version <version>` to either command to pin a specific release. See the [Microsoft CLI reference](https://learn.microsoft.com/dotnet/core/tools/dotnet-package-add).

In Visual Studio, open **Manage NuGet Packages** for the WPF project, search for **Fluence.Wpf**, choose a version, and install. In Package Manager Console:

```powershell
Install-Package Fluence.Wpf -ProjectName YourApp
```

After adding the package, [build a first app](usage.md).

## Use a source checkout

To build against unreleased changes, clone the [Fluence.Wpf library repository](https://github.com/sintaxasn/Fluence.Wpf) separately from this website. Run the commands in the next two sections from the library checkout root, with `$appProject` set to the actual path of your WPF application's `.csproj` file. If you already have the library checkout, use it instead of cloning again.

```powershell
git clone https://github.com/sintaxasn/Fluence.Wpf.git
Set-Location ./Fluence.Wpf
$appProject = 'C:\path\to\YourApp\YourApp.csproj' # Replace with your app's actual project path.
```

## Reference the library project

From the library checkout root, add a project reference to your WPF application:

```powershell
dotnet add $appProject reference ./Fluence.Wpf/Fluence.Wpf.csproj
```

## Build a local NuGet package

Pack the library checkout and add the resulting local package to your application. Set `$version` to the version in the package file name that `dotnet pack` writes to `./artifacts`:

```powershell
dotnet pack ./Fluence.Wpf/Fluence.Wpf.csproj -c Release -o ./artifacts
$packageSource = (Resolve-Path ./artifacts).Path
$version = '0.9.4' # Replace with the version of the package in ./artifacts.
dotnet add $appProject package Fluence.Wpf --version $version --no-restore
dotnet restore $appProject --source $packageSource --source https://api.nuget.org/v3/index.json
```

The Fluence package comes from the local output directory. The additional source lets NuGet resolve its package dependencies; use your configured dependency feed instead if required by your environment.

## Initialize resources

Call `ApplicationThemeManager.Apply` before showing the first window. The manager loads computed theme resources and control templates. Do not merge `Generic.xaml` yourself. See [Basic walkthrough](usage.md) for a complete example and [Theme Resources](../theming.md) for resource usage.
