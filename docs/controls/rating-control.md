# RatingControl

## Description

RatingControl is a WPF `Control` for choosing or displaying a star rating.

| Light | Dark |
| --- | --- |
| ![RatingControl in light mode](../screenshots/controls/rating-control-light.png) | ![RatingControl in dark mode](../screenshots/controls/rating-control-dark.png) |

## Example usage

```xml
<fluence:RatingControl Value="3" MaxRating="5" />
```

```csharp
var rating = new Fluence.Wpf.Controls.RatingControl { Value = 3, MaxRating = 5 };
```

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `Value` | `0` | Current rating, bounded by `MaxRating`. |
| `MaxRating` | `5` | Number of stars. |
| `IsReadOnly` | `false` | Makes the rating display-only. |
| `Caption` | Empty string | Optional caption displayed beside the stars. |

## State and behavior

Pointer or keyboard input changes Value; the control can also present a read-only rating.

## Related

- [C# how-to guide](../how-to/inputs-and-data.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/RatingControl.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GallerySelectionPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GallerySelectionPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/RatingControl.cs)
- [Control catalog](../controls.md)
