# Expander

## Description

Use Expander for secondary settings that should start collapsed until needed.

| Light | Dark |
| --- | --- |
| ![Expander in light mode](../screenshots/controls/expander-light.png) | ![Expander in dark mode](../screenshots/controls/expander-dark.png) |

### Captured state changes

**Expanded**

![Expander expanded state in light mode](../screenshots/controls/expander-light-expanded.png)
![Expander expanded state in dark mode](../screenshots/controls/expander-dark-expanded.png)

## Example usage

```xml
<fluence:Expander Header="Advanced options" IsExpanded="False">
    <fluence:ToggleSwitch HeaderContent="Send notifications" />
</fluence:Expander>
```

## State and behavior

IsExpanded reveals or hides secondary content; the header remains visible.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/Expander.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryLayoutPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryLayoutPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/Expander.cs)
- [Control catalog](../controls.md)
