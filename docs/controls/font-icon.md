# FontIcon

## Description

FontIcon displays a symbol from the Segoe Fluent icon font.

Use it for compact action or navigation icons that use the Segoe Fluent font.

| Light | Dark |
| --- | --- |
| ![FontIcon in light mode](../screenshots/controls/font-icon-light.png) | ![FontIcon in dark mode](../screenshots/controls/font-icon-dark.png) |

## Example usage

```xml
<fluence:FontIcon Glyph="&#xE8E5;" IconFontSize="20" />
```

```csharp
var icon = new Fluence.Wpf.Controls.FontIcon { Glyph = "\uE8E5", IconFontSize = 20 };
```

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `Glyph` | Empty string | Icon glyph. |
| `IconFontFamily` | Segoe Fluent Icons | Font used for the glyph. |
| `IconFontSize` | `16` | Glyph size. |
| `MirroredWhenRightToLeft` | `false` | Mirrors the icon in right-to-left layout. |
| `IsSpinning` | `false` | Enables spin animation. |

## State and behavior

Glyph selects a Segoe Fluent symbol; icon size and foreground follow their properties and theme.

## Related

- [C# how-to guide](../how-to/inputs-and-data.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/FontIcon.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryIconsPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryIconsPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/FontIcon.cs)
- [Control catalog](../controls.md)
