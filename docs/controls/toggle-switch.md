# ToggleSwitch

## Description

Use toggle switches for settings that take effect immediately.

| Light | Dark |
| --- | --- |
| ![ToggleSwitch in light mode](../screenshots/controls/toggle-switch-light.png) | ![ToggleSwitch in dark mode](../screenshots/controls/toggle-switch-dark.png) |

### Toggled state {#captured-state-changes}

![ToggleSwitch toggled state in light mode](../screenshots/controls/toggle-switch-light-toggled.png)
![ToggleSwitch toggled state in dark mode](../screenshots/controls/toggle-switch-dark-toggled.png)

## Example usage

```xml
<fluence:ToggleSwitch IsChecked="True" />
```


```csharp
var toggle = new Fluence.Wpf.Controls.ToggleSwitch { HeaderContent = "Notifications", IsChecked = true };
```


## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `HeaderContent` | `null` | Content displayed as the switch header. |
| `OnContent` | `null` | Content displayed for the on state. |
| `OffContent` | `null` | Content displayed for the off state. |
| `IsChecked` | `false` | Current toggle state. |

## State and behavior

IsChecked changes the switch position immediately; IsEnabled controls the disabled appearance.

## Events

`Checked` and `Unchecked` report state changes.

## Related

- [C# how-to guide](../how-to/inputs-and-data.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/ToggleSwitch.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GallerySelectionPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GallerySelectionPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/ToggleSwitch.cs)
- [Control catalog](../controls.md)
