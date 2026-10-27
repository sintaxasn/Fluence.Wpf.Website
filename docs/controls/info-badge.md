# InfoBadge

## Description

InfoBadge is a WPF `ContentControl` that displays a compact dot, number, or icon.

| Light | Dark |
| --- | --- |
| ![InfoBadge in light mode](../screenshots/controls/info-badge-light.png) | ![InfoBadge in dark mode](../screenshots/controls/info-badge-dark.png) |

## Example usage

```xml
<fluence:InfoBadge Value="12" />
```

```csharp
var badge = new Fluence.Wpf.Controls.InfoBadge { Value = 12 };
```

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `Value` | `-1` | Shows a dot at `-1` or a numeric value. |
| `BadgeStyle` | `Attention` | Sets the appearance: `Attention`, `Informational`, `Success`, `Critical`, or `Caution`. |
| `IconSource` | `null` | Displays an icon instead of the value text. |

## State and behavior

Value and BadgeStyle change the compact status shown beside a destination.

Use `NavigationViewItem.InfoBadge` to attach a badge to a navigation destination.

## Related

- [C# how-to guide](../how-to/navigation-and-tabs.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/InfoBadge.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/InfoBadge.cs)
- [Control catalog](../controls.md)
