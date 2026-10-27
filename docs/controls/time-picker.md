# TimePicker

## Description

TimePicker is a WPF `Control` for selecting a time in a flyout.

| Light | Dark |
| --- | --- |
| ![TimePicker in light mode](../screenshots/controls/time-picker-light.png) | ![TimePicker in dark mode](../screenshots/controls/time-picker-dark.png) |

## Example usage

```xml
<fluence:TimePicker Header="Reminder time" PlaceholderText="Pick a time" />
```

```csharp
var picker = new Fluence.Wpf.Controls.TimePicker { Header = "Reminder time" };
```

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `SelectedTime` | `null` | Selected time as a nullable `TimeSpan`. |
| `ClockIdentifier` | Current culture | Selects `12HourClock` or `24HourClock`. |
| `MinuteIncrement` | `1` | Sets the minute step, clamped from 1 through 59. |
| `Header` | `null` | Optional label above the field. |

## State and behavior

Opening the picker exposes time columns; selection updates the chosen time.

## Events

`SelectedTimeChanged` is raised when the selected time changes, including a programmatic change.

## Related

- [C# how-to guide](../how-to/inputs-and-data.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/TimePicker.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryFormsPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryFormsPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/TimePicker.cs)
- [Control catalog](../controls.md)
