# Basic walkthrough

Run the [standalone Basic walkthrough example](https://github.com/sintaxasn/Fluence.Wpf.Website/tree/main/samples/Fluence.Wpf.Docs.Walkthroughs) from the Website repository root. The first command restores and builds against the explicit local package source; the second runs the example:

~~~powershell
pwsh ./samples/Fluence.Wpf.Docs.Walkthroughs/Build-Walkthroughs.ps1 -PackageSource ./samples/Fluence.Wpf.Docs.Walkthroughs/packages
dotnet run --project ./samples/Fluence.Wpf.Docs.Walkthroughs/Fluence.Wpf.Docs.Walkthroughs.csproj -c Release --no-build -- --example basic-usage
~~~

The window asks for a name. Select **Say hello** and the result shows `Hello ` followed by the text you entered. Each walkthrough has its own window and run command.

## Initialize the application

Apply the Fluence theme before constructing the first window. Leave `StartupUri` unset in `App.xaml`:

~~~xml
<Application x:Class="Fluence.Wpf.Docs.Walkthroughs.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" />
~~~

The minimal startup for this one window is:

~~~csharp
using System.Windows;
using Fluence.Wpf;

namespace Fluence.Wpf.Docs.Walkthroughs;

public partial class App : Application
{
    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);
        ApplicationThemeManager.Apply(ApplicationTheme.Auto);

        MainWindow = new BasicUsageWindow();
        MainWindow.Show();
    }
}
~~~

This startup class and the window below use the same namespace. The runnable sample's [App.xaml.cs](https://github.com/sintaxasn/Fluence.Wpf.Website/blob/main/samples/Fluence.Wpf.Docs.Walkthroughs/App.xaml.cs) also selects the requested `--example` slug and runs [CaptureRunner.cs](https://github.com/sintaxasn/Fluence.Wpf.Website/blob/main/samples/Fluence.Wpf.Docs.Walkthroughs/CaptureRunner.cs) for screenshots. `Auto` follows the Windows app theme and uses the system accent by default. Theme initialization loads the Fluence control templates, so do not merge `Generic.xaml` yourself.

## Declare the window and its layout

The sample's [BasicUsageWindow.xaml](https://github.com/sintaxasn/Fluence.Wpf.Website/blob/main/samples/Fluence.Wpf.Docs.Walkthroughs/BasicUsageWindow.xaml) has a title, an application icon, and a title-bar image. The icon is a compiled resource in the sample project; update its URI when copying the window into another project.

~~~xml
<fluence:FluenceWindow
    x:Class="Fluence.Wpf.Docs.Walkthroughs.BasicUsageWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:fluence="http://schemas.fluencewpf.com"
    Title="My first Fluent window"
    Icon="/Fluence.Wpf.Docs.Walkthroughs;component/Fluence_Icon.ico"
    Width="800" Height="540" MinWidth="640" MinHeight="420"
    WindowStartupLocation="CenterScreen"
    Background="{DynamicResource ApplicationBackgroundBrush}"
    SystemBackdropType="Mica"
    ExtendsContentIntoTitleBar="True">
    <fluence:FluenceWindow.TitleBar>
        <fluence:TitleBar Title="My first Fluent window" Subtitle="Fluence WPF walkthrough">
            <fluence:TitleBar.Icon>
                <Image Width="20" Height="20" Source="/Fluence.Wpf.Docs.Walkthroughs;component/Fluence_Icon.ico" />
            </fluence:TitleBar.Icon>
        </fluence:TitleBar>
    </fluence:FluenceWindow.TitleBar>
    <fluence:StackPanel Spacing="16" HorizontalAlignment="Center" VerticalAlignment="Center">
        <fluence:TextBlock Text="Enter your name" HorizontalAlignment="Center" />
        <fluence:TextBox x:Name="NameInput" Width="330" HorizontalAlignment="Center" />
        <fluence:Button Content="Say hello" Click="SayHello_Click"
                        Appearance="Accent" HorizontalAlignment="Center" />
        <fluence:TextBlock x:Name="ResultText" HorizontalAlignment="Center" />
    </fluence:StackPanel>
</fluence:FluenceWindow>
~~~

The `fluence:StackPanel` centers the group vertically and each control horizontally. `Spacing="16"` gives adjacent controls a 16 device-independent-pixel gap. `DynamicResource` lets the background follow theme changes.

## Handle the click

The named input and result are available in [BasicUsageWindow.xaml.cs](https://github.com/sintaxasn/Fluence.Wpf.Website/blob/main/samples/Fluence.Wpf.Docs.Walkthroughs/BasicUsageWindow.xaml.cs). The click handler calls `UpdateGreeting`, which reads the current input:

~~~csharp
private void SayHello_Click(object sender, RoutedEventArgs e)
{
    UpdateGreeting();
}

private void UpdateGreeting()
{
    ResultText.Text = "Hello " + NameInput.Text;
}
~~~

The sample's code-behind also has a `PrepareCapture` method for repeatable screenshots. An application does not need it. Change the `App.xaml` class, window `x:Class`, and code-behind namespace together when moving the example into your own project.

The completed window in light and dark themes:

![Basic walkthrough window in light mode](../screenshots/tutorials/basic-usage-light.png)

![Basic walkthrough window in dark mode](../screenshots/tutorials/basic-usage-dark.png)

## Continue

Open the [window and title bar walkthrough](../how-to/window-and-title-bar.md), browse the [control catalog](../controls.md), or [run the Gallery](gallery.md).
