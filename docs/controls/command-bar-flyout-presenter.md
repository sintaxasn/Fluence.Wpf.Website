# CommandBarFlyoutPresenter

## Description

CommandBarFlyoutPresenter draws the primary strip and overflow surface of CommandBarFlyout. `CommandBarFlyoutPresenter` is shown within `CommandBarFlyout`; it is not a separate gallery destination.

Use it through CommandBarFlyout when a command strip needs an overflow surface.

| Light | Dark |
| --- | --- |
| ![CommandBarFlyoutPresenter in light mode](../screenshots/controls/command-bar-flyout-presenter-light-open.png) | ![CommandBarFlyoutPresenter in dark mode](../screenshots/controls/command-bar-flyout-presenter-dark-open.png) |

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

The presenter displays command bar content and switches between collapsed and expanded overflow states.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/CommandBarFlyoutPresenter.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/CommandBarFlyoutPresenter.cs)
- [Control catalog](../controls.md)
