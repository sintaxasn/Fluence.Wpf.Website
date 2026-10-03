# Add navigation and tabs

This standalone window uses `NavigationView` for two destinations and `TabView` for work inside the selected destination. Begin with the [Basic walkthrough](../csharp/usage.md) theme setup, then run this example from the Website repository root. The first command restores and builds against the explicit local package source; the second runs the example:

~~~powershell
pwsh ./samples/Fluence.Wpf.Docs.Walkthroughs/Build-Walkthroughs.ps1 -PackageSource ./samples/Fluence.Wpf.Docs.Walkthroughs/packages
dotnet run --project ./samples/Fluence.Wpf.Docs.Walkthroughs/Fluence.Wpf.Docs.Walkthroughs.csproj -c Release --no-build -- --example navigation-and-tabs
~~~

## Declare the window

The complete layout is in [NavigationAndTabsWindow.xaml](https://github.com/sintaxasn/Fluence.Wpf.Website/blob/main/samples/Fluence.Wpf.Docs.Walkthroughs/NavigationAndTabsWindow.xaml). The icon URI points to a resource in the sample project; use your own resource when copying the window.

~~~xml
<fluence:FluenceWindow
    x:Class="Fluence.Wpf.Docs.Walkthroughs.NavigationAndTabsWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:fluence="http://schemas.fluencewpf.com"
    Title="Navigation and tabs"
    Icon="/Fluence.Wpf.Docs.Walkthroughs;component/Fluence_Icon_Light.ico"
    Width="800" Height="540" MinWidth="640" MinHeight="420"
    WindowStartupLocation="CenterScreen"
    Background="{DynamicResource ApplicationBackgroundBrush}"
    SystemBackdropType="Mica"
    ExtendsContentIntoTitleBar="True">
    <fluence:FluenceWindow.TitleBar>
        <fluence:TitleBar Title="Navigation and tabs" Subtitle="Fluence WPF walkthrough">
            <fluence:TitleBar.Icon>
                <Image Width="20" Height="20" Source="/Fluence.Wpf.Docs.Walkthroughs;component/Fluence_Icon_Light.ico" />
            </fluence:TitleBar.Icon>
        </fluence:TitleBar>
    </fluence:FluenceWindow.TitleBar>
    <Grid Margin="32">
        <fluence:NavigationView x:Name="Navigation" IsPaneOpen="True"
                                SelectionChanged="Navigation_SelectionChanged">
            <fluence:NavigationView.Items>
                <fluence:NavigationViewItem Content="Home" />
                <fluence:NavigationViewItem Content="Settings" />
            </fluence:NavigationView.Items>
            <fluence:NavigationView.Content>
                <fluence:StackPanel Margin="24" Spacing="16">
                    <fluence:TextBlock x:Name="DestinationText" Text="Home" />
                    <fluence:TabView x:Name="Tabs" Height="230" IsAddTabButtonVisible="True"
                                     AddTabButtonClick="Tabs_AddTabButtonClick"
                                     TabCloseRequested="Tabs_TabCloseRequested">
                        <fluence:TabViewItem Header="Overview" Content="Overview content" />
                        <fluence:TabViewItem Header="Notes" Content="Notes content" />
                    </fluence:TabView>
                </fluence:StackPanel>
            </fluence:NavigationView.Content>
        </fluence:NavigationView>
    </Grid>
</fluence:FluenceWindow>
~~~

## Wire the interaction

[NavigationAndTabsWindow.xaml.cs](https://github.com/sintaxasn/Fluence.Wpf.Website/blob/main/samples/Fluence.Wpf.Docs.Walkthroughs/NavigationAndTabsWindow.xaml.cs) contains the code-behind. The `x:Class` in XAML and the partial class name in C# must match.

~~~csharp
using System.Globalization;
using System.Windows;
using System.Windows.Controls;
using Fluence.Wpf.Controls;
namespace Fluence.Wpf.Docs.Walkthroughs
{
    public sealed partial class NavigationAndTabsWindow : FluenceWindow
    {
        private int _nextTabNumber = 1;

        internal NavigationAndTabsWindow()
        {
            InitializeComponent();
            Navigation.SelectedIndex = 0;
        }

        private void Navigation_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (Navigation.SelectedItem is NavigationViewItem item)
            {
                DestinationText.Text = item.Content?.ToString() ?? string.Empty;
            }
        }

        private void Tabs_AddTabButtonClick(object sender, RoutedEventArgs e)
        {
            TabViewItem tab = new()
            {
                Header = "New " + _nextTabNumber.ToString(CultureInfo.CurrentCulture),
                Content = "Content for new tab " + _nextTabNumber.ToString(CultureInfo.CurrentCulture),
            };
            _nextTabNumber++;
            _ = Tabs.Items.Add(tab);
            Tabs.SelectedItem = tab;
        }

        private void Tabs_TabCloseRequested(object sender, TabViewTabCloseRequestedEventArgs e)
        {
            Tabs.Items.Remove(e.Item);
        }
    }
}
~~~

`NavigationView.Items` holds the destinations. The content panel is assigned through `NavigationView.Content`; placing it as a bare child would put it among the selectable items. `fluence:StackPanel` spaces the destination label and tabs. `Navigation_SelectionChanged` copies the selected destination into `DestinationText`. The add button creates a new `TabViewItem`, adds it to `Tabs.Items`, and selects it. `TabCloseRequested` removes a tab when its close button is selected. This example changes the displayed destination label; it does not create a navigation history.

## See the result

![Add navigation and tabs in light mode](../screenshots/tutorials/navigation-and-tabs-light.png)

![Add navigation and tabs in dark mode](../screenshots/tutorials/navigation-and-tabs-dark.png)

See [NavigationView](../controls/navigation-view.md), [TabView](../controls/tab-view.md), and the [gallery shell](https://github.com/sintaxasn/Fluence.Wpf/blob/main/Fluence.Wpf.Demo/MainWindow.xaml) for a larger navigation example.
