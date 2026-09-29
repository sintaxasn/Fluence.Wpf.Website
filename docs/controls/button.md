# Button

## Description

Use Button for actions. Choose its Accent appearance for the primary action and Subtle for a less prominent command.

| Light | Dark |
| --- | --- |
| ![Button in light mode](../screenshots/controls/button-light.png) | ![Button in dark mode](../screenshots/controls/button-dark.png) |

### Captured state changes

**Disabled**

![Button disabled in light mode](../screenshots/controls/button-light-disabled.png)
![Button disabled in dark mode](../screenshots/controls/button-dark-disabled.png)

**Blue accent**

![Button blue accent in light mode](../screenshots/controls/button-light-accent-blue.png)

**Orange accent**

![Button orange accent in light mode](../screenshots/controls/button-light-accent-orange.png)

## Example usage

```xml
<fluence:Button Content="Accent style button" Appearance="Accent" />
```

## State and behavior

Appearance changes emphasis. Pointer-over, pressed, keyboard focus, and disabled states change the surface.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/Button.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryButtonsPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryButtonsPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/Button.cs)
- [Control catalog](../controls.md)
