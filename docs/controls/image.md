# Image

## Description

Use Image to present pictures with a theme-aware stroke; CornerRadius drives the rounded clip from square to circular.

| Light | Dark |
| --- | --- |
| ![Image in light mode](../screenshots/controls/image-light.png) | ![Image in dark mode](../screenshots/controls/image-dark.png) |

## Example usage

```xml
<fluence:Image Source="photo.png" CornerRadius="8" />
```

```csharp
var image = new Fluence.Wpf.Controls.Image { CornerRadius = new System.Windows.CornerRadius(8) };
```

Replace `photo.png` with an image resource in your application.

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `Source` | `null` | Image source. |
| `Stretch` | `Uniform` | Controls how the image fits its bounds. |
| `CornerRadius` | `4` | Rounds the image surface. |

## State and behavior

CornerRadius changes the image clip from square to rounded; its stroke follows the theme.

## Related

- [C# how-to guide](../how-to/inputs-and-data.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/Image.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryDataPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryDataPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/Image.cs)
- [Control catalog](../controls.md)
