# Flyout

## Description

Use Flyout for lightweight, light-dismiss popups (details, quick forms, confirmations) anchored to a control.

The images show the open popup. A closed flyout has no visible surface.

| Light | Dark |
| --- | --- |
| ![Flyout in light mode](../screenshots/controls/flyout-light.png) | ![Flyout in dark mode](../screenshots/controls/flyout-dark.png) |

## Example usage

```xml
<fluence:Button Content="More" Click="ShowFlyoutButton_Click">
    <fluence:FlyoutBase.AttachedFlyout>
        <fluence:Flyout Content="Details" />
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

## State and behavior

The anchored popup opens on request and closes on light dismissal or Hide.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/Flyout.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/Flyout.cs)
- [Control catalog](../controls.md)
