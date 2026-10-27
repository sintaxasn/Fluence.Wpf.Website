# StackPanel

## Description

Use StackPanel to arrange children in a row or column with uniform `Spacing` between them, instead of setting a margin on each child.

| Light | Dark |
| --- | --- |
| ![StackPanel in light mode](../screenshots/controls/stack-panel-light.png) | ![StackPanel in dark mode](../screenshots/controls/stack-panel-dark.png) |

## Example usage

```xml
<fluence:StackPanel Spacing="10">
    <fluence:Button Content="New" />
    <fluence:Button Content="Open" />
    <fluence:Button Content="Save" />
</fluence:StackPanel>
```

## State and behavior

Spacing changes the gaps between stacked children; orientation changes the layout direction.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/StackPanel.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryLayoutPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryLayoutPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/StackPanel.cs)
- [Control catalog](../controls.md)
