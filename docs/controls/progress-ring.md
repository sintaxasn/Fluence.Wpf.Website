# ProgressRing

## Description

ProgressRing is a WPF `Control` that displays indeterminate or measurable progress.

| Light | Dark |
| --- | --- |
| ![ProgressRing in light mode](../screenshots/controls/progress-ring-light.png) | ![ProgressRing in dark mode](../screenshots/controls/progress-ring-dark.png) |

## Example usage

```xml
<fluence:ProgressRing IsActive="True" />
```

```csharp
var ring = new Fluence.Wpf.Controls.ProgressRing { IsActive = true };
```

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `IsActive` | `true` | Activates the ring. |
| `IsIndeterminate` | `true` | Shows ongoing work without a value. |
| `Value` | `0` | Current determinate value. |
| `Minimum`, `Maximum` | `0`, `100` | Bounds of the progress range. |
| `ShowError`, `ShowPaused` | `false` | Select error or paused presentation. |

## State and behavior

IsActive starts or stops the ring; Value can represent determinate progress.

An active indeterminate ring keeps its essential animation when Windows animations are disabled. Error state takes precedence over pause; inactive, paused without an error, hidden, unloaded, and determinate rings do not run the indeterminate animation.

## Related

- [C# how-to guide](../how-to/dialogs-and-feedback.md)

## Additional behavior

An active indeterminate `ProgressRing` keeps its essential progress animation when Windows animations are disabled or software rendering is in use. It stops while paused, inactive, hidden, unloaded, or determinate. Error state takes precedence over paused state.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/ProgressRing.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryStatusPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryStatusPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/ProgressRing.cs)
- [Control catalog](../controls.md)
