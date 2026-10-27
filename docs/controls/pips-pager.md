# PipsPager

## Description

Use PipsPager for compact page indication and switching, as in carousels and onboarding flows.

| Light | Dark |
| --- | --- |
| ![PipsPager in light mode](../screenshots/controls/pips-pager-light.png) | ![PipsPager in dark mode](../screenshots/controls/pips-pager-dark.png) |

### Captured state changes

**Page selected**

![PipsPager page-selected state in light mode](../screenshots/controls/pips-pager-light-page-selected.png)
![PipsPager page-selected state in dark mode](../screenshots/controls/pips-pager-dark-page-selected.png)

## Example usage

```xml
<fluence:PipsPager NumberOfPages="5" SelectedPageIndex="0" />
```

```csharp
var pager = new Fluence.Wpf.Controls.PipsPager { NumberOfPages = 5 };
```

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `NumberOfPages` | `0` | Total number of pages. |
| `SelectedPageIndex` | `0` | Selected page index. |
| `MaxVisiblePips` | `5` | Maximum visible page indicators. |
| `Orientation` | `Horizontal` | Direction of the pager. |
| `PreviousButtonVisibility`, `NextButtonVisibility` | `Collapsed` | Controls arrow-button visibility. |

## State and behavior

The selected pip follows SelectedPageIndex; next and previous actions change the current page.

## Events

`SelectedIndexChanged` reports a changed page index.

## Related

- [C# how-to guide](../how-to/navigation-and-tabs.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/PipsPager.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/PipsPager.cs)
- [Control catalog](../controls.md)
