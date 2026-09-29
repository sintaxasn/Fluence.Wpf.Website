# NavigationViewItemSeparator

## Description

Use a separator to divide destination groups in NavigationView. `NavigationViewItemSeparator` is shown within `NavigationView`; it is not a separate gallery destination.

| Light | Dark |
| --- | --- |
| ![NavigationViewItemSeparator in light mode](../screenshots/controls/navigation-view-item-separator-light.png) | ![NavigationViewItemSeparator in dark mode](../screenshots/controls/navigation-view-item-separator-dark.png) |

## Example usage

```xml
<fluence:NavigationView>
    <fluence:NavigationViewItem Content="Home" />
    <fluence:NavigationViewItemSeparator />
    <fluence:NavigationViewItem Content="Settings" />
</fluence:NavigationView>
```

## State and behavior

Separators divide destination groups and have no selected state.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/NavigationViewItemSeparator.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/NavigationViewItemSeparator.cs)
- [Control catalog](../controls.md)
