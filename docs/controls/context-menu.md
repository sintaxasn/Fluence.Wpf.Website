# ContextMenu

## Description

Use ContextMenu for actions that apply to a selected item or region.

| Light | Dark |
| --- | --- |
| ![ContextMenu in light mode](../screenshots/controls/context-menu-light.png) | ![ContextMenu in dark mode](../screenshots/controls/context-menu-dark.png) |

### Captured state changes

**Open**

![ContextMenu open state in light mode](../screenshots/controls/context-menu-light-open.png)
![ContextMenu open state in dark mode](../screenshots/controls/context-menu-dark-open.png)

## Example usage

```xml
<fluence:Button Content="Open context menu">
    <fluence:Button.ContextMenu>
        <fluence:ContextMenu>
            <fluence:MenuItem Header="Copy" />
        </fluence:ContextMenu>
    </fluence:Button.ContextMenu>
</fluence:Button>
```

## State and behavior

The menu opens at the target and closes after a command or light dismissal.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/ContextMenu.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/ContextMenu.cs)
- [Control catalog](../controls.md)
