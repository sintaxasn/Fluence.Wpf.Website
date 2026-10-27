# PersonPicture

## Description

PersonPicture is a WPF `Control` that represents a person or group with a photo, initials, or a glyph.

| Light | Dark |
| --- | --- |
| ![PersonPicture in light mode](../screenshots/controls/person-picture-light.png) | ![PersonPicture in dark mode](../screenshots/controls/person-picture-dark.png) |

## Example usage

```xml
<fluence:PersonPicture DisplayName="Ana Bowman" />
```

```csharp
var avatar = new Fluence.Wpf.Controls.PersonPicture { DisplayName = "Ana Bowman" };
```

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `DisplayName` | Empty string | Name used to derive up to two initials. |
| `Initials` | Empty string | Explicit initials override those derived from the name. |
| `ProfilePicture` | `null` | Image source for the profile photo. |
| `IsGroup` | `false` | Displays a group glyph. |
| `BadgeNumber` | `0` | Number shown in the optional badge. |
| `BadgeGlyph` | `null` | Glyph shown in the optional badge. |

## State and behavior

`ProfilePicture` shows a photo. Without one, the control shows initials, derived from `DisplayName` unless `Initials` is set. `IsGroup` shows the group glyph. `BadgeNumber` or `BadgeGlyph` adds a badge.

## Related

- [C# how-to guide](../how-to/inputs-and-data.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/PersonPicture.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryDataPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryDataPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/PersonPicture.cs)
- [Control catalog](../controls.md)
