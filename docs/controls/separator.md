# Separator

## Description

Separator divides related groups of content with a themed stroke.

Use it between related groups of controls or commands.

| Light | Dark |
| --- | --- |
| ![Separator in light mode](../screenshots/controls/separator-light.png) | ![Separator in dark mode](../screenshots/controls/separator-dark.png) |

## Example usage

```xml
<fluence:StackPanel Spacing="8">
    <TextBlock Text="Account" />
    <fluence:Separator />
    <TextBlock Text="Notifications" />
</fluence:StackPanel>
```

## State and behavior

The divider separates content groups and follows theme strokes.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/Separator.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryLayoutPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryLayoutPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/Separator.cs)
- [Control catalog](../controls.md)
