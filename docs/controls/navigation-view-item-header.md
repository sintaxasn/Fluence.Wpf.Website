# NavigationViewItemHeader

## Description

Use a header to label a group of destinations in NavigationView. `NavigationViewItemHeader` is shown within `NavigationView`; it is not a separate gallery destination.

| Light | Dark |
| --- | --- |
| ![NavigationViewItemHeader in light mode](../screenshots/controls/navigation-view-item-header-light.png) | ![NavigationViewItemHeader in dark mode](../screenshots/controls/navigation-view-item-header-dark.png) |

## Example usage

```xml
<fluence:NavigationView>
    <fluence:NavigationViewItemHeader Content="Workspace" />
    <fluence:NavigationViewItem Content="Home" />
</fluence:NavigationView>
```

## State and behavior

Headers label groups of NavigationView items; they do not navigate as destinations.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/NavigationViewItemHeader.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/NavigationViewItemHeader.cs)
- [Control catalog](../controls.md)
