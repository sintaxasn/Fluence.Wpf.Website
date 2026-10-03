# CommandBarFlyout

## Description

Use CommandBarFlyout for a compact command strip with an overflow menu; commands dismiss the flyout when invoked.

The first images show the open command surface. The closed-state images below show its trigger button.

| Light | Dark |
| --- | --- |
| ![CommandBarFlyout in light mode](../screenshots/controls/command-bar-flyout-light-open.png) | ![CommandBarFlyout in dark mode](../screenshots/controls/command-bar-flyout-dark-open.png) |

### Captured state changes

**Closed trigger**

![CommandBarFlyout closed trigger in light mode](../screenshots/controls/command-bar-flyout-light.png)
![CommandBarFlyout closed trigger in dark mode](../screenshots/controls/command-bar-flyout-dark.png)

## Example usage

```xml
<fluence:Button Content="Commands" Click="ShowFlyoutButton_Click">
    <fluence:FlyoutBase.AttachedFlyout>
        <fluence:CommandBarFlyout>
            <fluence:CommandBarFlyout.PrimaryCommands>
                <fluence:AppBarButton Label="Copy" Command="{Binding CopyCommand}" />
            </fluence:CommandBarFlyout.PrimaryCommands>
            <fluence:CommandBarFlyout.SecondaryCommands>
                <fluence:AppBarButton Label="Delete" Command="{Binding DeleteCommand}" />
            </fluence:CommandBarFlyout.SecondaryCommands>
        </fluence:CommandBarFlyout>
    </fluence:FlyoutBase.AttachedFlyout>
</fluence:Button>
```

In the window or page code-behind:

```csharp
private void ShowFlyoutButton_Click(object sender, System.Windows.RoutedEventArgs e)
{
    if (sender is System.Windows.FrameworkElement target)
    {
        Fluence.Wpf.Controls.FlyoutBase.ShowAttachedFlyout(target);
    }
}
```

Bind `CopyCommand` and `DeleteCommand` on the page's data context.

## State and behavior

Primary commands appear on the strip; secondary commands appear in overflow.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/CommandBarFlyout.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/CommandBarFlyout.cs)
- [Control catalog](../controls.md)
