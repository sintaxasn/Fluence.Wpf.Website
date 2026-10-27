# ProgressBar

## Description

Use ProgressBar for measurable work where the current value can be reported.

| Light | Dark |
| --- | --- |
| ![ProgressBar in light mode](../screenshots/controls/progress-bar-light.png) | ![ProgressBar in dark mode](../screenshots/controls/progress-bar-dark.png) |

## Example usage

```xml
<fluence:StackPanel Spacing="12">
    <fluence:ProgressBar Minimum="0" Maximum="100" Value="45" />
    <fluence:ProgressBar IsIndeterminate="True" />
</fluence:StackPanel>
```

```csharp
var progress = new Fluence.Wpf.Controls.ProgressBar { Value = 40 };
```

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `ProgressMode` | `Standard` | Selects the progress presentation. |
| `ShowError`, `ShowPaused` | `false` | Select error or paused presentation. |
| `Steps`, `CurrentStep` | `0` | Configure the total and current step in step-progress mode. |
| `ShowStepMarkers` | `false` | Shows step markers. |
| `TrackHeight` | `1` | Sets track height in device-independent units. |

## State and behavior

Value fills a determinate bar; IsIndeterminate presents ongoing work without a percentage.

## Additional behavior

The ProgressBar uses a 1 DIP track and a 3 DIP indicator by default. Their vertical centerlines align in the determinate presentation. Custom `TrackHeight` or `MinHeight` values can have half-pixel offsets from device-pixel rounding.

## Related

- [C# how-to guide](../how-to/dialogs-and-feedback.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/ProgressBar.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryStatusPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryStatusPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/ProgressBar.cs)
- [Control catalog](../controls.md)
