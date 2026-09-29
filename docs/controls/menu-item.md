# MenuItem

## Description

MenuItem is a command or submenu entry inside Menu or ContextMenu. `MenuItem` is shown within `Menu`; it is not a separate gallery destination.

Use it for commands or nested choices inside Menu or ContextMenu.

| Light | Dark |
| --- | --- |
| ![MenuItem in light mode](../screenshots/controls/menu-item-light.png) | ![MenuItem in dark mode](../screenshots/controls/menu-item-dark.png) |

## Example usage

```xml
<fluence:Menu>
    <fluence:MenuItem Header="_File">
        <fluence:MenuItem Header="_Open" Command="{Binding OpenCommand}" />
        <fluence:MenuItem Header="Status bar" IsCheckable="True" IsChecked="True" />
    </fluence:MenuItem>
</fluence:Menu>
```

## State and behavior

MenuItem can open a submenu, toggle a checked state, or invoke a command.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/MenuItem.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/MenuItem.cs)
- [Control catalog](../controls.md)
