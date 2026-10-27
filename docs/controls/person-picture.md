# PersonPicture

## Description

Use PersonPicture to show a person or group as a circular avatar: a profile photo, initials, or a placeholder glyph, with an optional badge.

| Light | Dark |
| --- | --- |
| ![PersonPicture in light mode](../screenshots/controls/person-picture-light.png) | ![PersonPicture in dark mode](../screenshots/controls/person-picture-dark.png) |

## Example usage

```xml
<fluence:PersonPicture DisplayName="Ana Bowman" />
```

## State and behavior

`ProfilePicture` shows a photo. Without one, the control shows initials, derived from `DisplayName` unless `Initials` is set. `IsGroup` shows the group glyph. `BadgeNumber` or `BadgeGlyph` adds a badge.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/PersonPicture.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryDataPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryDataPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/PersonPicture.cs)
- [Control catalog](../controls.md)
