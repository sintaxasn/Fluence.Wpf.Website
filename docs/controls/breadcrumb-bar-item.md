# BreadcrumbBarItem

## Description

BreadcrumbBar creates item containers for the visible path segments. `BreadcrumbBarItem` is shown within `BreadcrumbBar`; it is not a separate gallery destination.

Use it through BreadcrumbBar when people need to return to an ancestor location.

| Light | Dark |
| --- | --- |
| ![BreadcrumbBarItem in light mode](../screenshots/controls/breadcrumb-bar-item-light.png) | ![BreadcrumbBarItem in dark mode](../screenshots/controls/breadcrumb-bar-item-dark.png) |

## Example usage

```xml
<fluence:BreadcrumbBar ItemsSource="{Binding PathSegments}" />
```

## State and behavior

A breadcrumb item is created inside BreadcrumbBar from the path; selecting an ancestor raises ItemClicked.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/BreadcrumbBarItem.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/BreadcrumbBarItem.cs)
- [Control catalog](../controls.md)
