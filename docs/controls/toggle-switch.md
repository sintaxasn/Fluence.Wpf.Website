# ToggleSwitch

## Description

Use toggle switches for settings that take effect immediately.

| Light | Dark |
| --- | --- |
| ![ToggleSwitch in light mode](../screenshots/controls/toggle-switch-light.png) | ![ToggleSwitch in dark mode](../screenshots/controls/toggle-switch-dark.png) |

### Captured state changes

**Toggled**

![ToggleSwitch toggled state in light mode](../screenshots/controls/toggle-switch-light-toggled.png)
![ToggleSwitch toggled state in dark mode](../screenshots/controls/toggle-switch-dark-toggled.png)

## Example usage

```xml
<fluence:ToggleSwitch IsChecked="True" />
```

## State and behavior

IsChecked changes the switch position immediately; IsEnabled controls the disabled appearance.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/ToggleSwitch.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GallerySelectionPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GallerySelectionPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/ToggleSwitch.cs)
- [Control catalog](../controls.md)
