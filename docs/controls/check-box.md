# CheckBox

## Description

Use check boxes for independent options. Add three-state only when an indeterminate value has meaning.

| Light | Dark |
| --- | --- |
| ![CheckBox in light mode](../screenshots/controls/check-box-light.png) | ![CheckBox in dark mode](../screenshots/controls/check-box-dark.png) |

## Example usage

```xml
<fluence:CheckBox Content="Two-state checkbox" IsChecked="True" />
```

## State and behavior

IsChecked shows unchecked and checked states, with indeterminate available when IsThreeState is enabled.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/CheckBox.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GallerySelectionPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GallerySelectionPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/CheckBox.cs)
- [Control catalog](../controls.md)
