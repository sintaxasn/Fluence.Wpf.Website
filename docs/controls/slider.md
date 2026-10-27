# Slider

## Description

Use sliders when a relative value is easier to choose visually than typing a precise number.

| Light | Dark |
| --- | --- |
| ![Slider in light mode](../screenshots/controls/slider-light.png) | ![Slider in dark mode](../screenshots/controls/slider-dark.png) |

## Example usage

```xml
<fluence:Slider Value="35" Minimum="0" Maximum="100" />
```


```csharp
var slider = new Fluence.Wpf.Controls.Slider { Minimum = 0, Maximum = 100, Value = 50 };
```


## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `Minimum` | `0` | Lower end of the range. |
| `Maximum` | `10` | Upper end of the range. |
| `Value` | `0` | Current value within the range. |

## State and behavior

Dragging or using the keyboard changes Value; bounds and tick settings constrain the selection.

## Events

`ValueChanged` is raised when the value changes.

## Related

- [C# how-to guide](../how-to/inputs-and-data.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/Slider.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryInputsPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryInputsPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/Slider.cs)
- [Control catalog](../controls.md)
