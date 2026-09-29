# NavigationViewItem

## Description

NavigationViewItem is a selectable destination inside NavigationView. `NavigationViewItem` is shown within `NavigationView`; it is not a separate gallery destination.

Use it for a selectable destination in NavigationView.

| Light | Dark |
| --- | --- |
| ![NavigationViewItem in light mode](../screenshots/controls/navigation-view-item-light.png) | ![NavigationViewItem in dark mode](../screenshots/controls/navigation-view-item-dark.png) |

## Example usage

```xml
<fluence:NavigationView>
    <fluence:NavigationViewItem Content="Home" IsSelected="True" />
    <fluence:NavigationViewItem Content="Files" />
</fluence:NavigationView>
```

## State and behavior

Selected and unselected destinations differ visually; InfoBadge can show item status.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/NavigationViewItem.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/NavigationViewItem.cs)
- [Control catalog](../controls.md)
