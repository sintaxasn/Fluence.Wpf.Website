# DockPanel

## Description

DockPanel is a WPF `Panel` that docks children at edges and adds uniform spacing.

| Light | Dark |
| --- | --- |
| ![DockPanel in light mode](../screenshots/controls/dock-panel-light.png) | ![DockPanel in dark mode](../screenshots/controls/dock-panel-dark.png) |

## Example usage

```xml
<fluence:DockPanel>
    <fluence:Button DockPanel.Dock="Right" Content="Action" />
    <TextBlock Text="Summary" />
</fluence:DockPanel>
```

```csharp
var panel = new Fluence.Wpf.Controls.DockPanel { Spacing = 8 };
```

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `Spacing` | `0` | Space between consecutive docked children. |
| `LastChildFill` | `true` | Makes the final child fill the remaining area. |

## State and behavior

Dock attached properties pin children to edges while the final child fills remaining space.

Unlike the native WPF DockPanel, this panel supplies `Spacing`. Use the WPF `DockPanel.Dock` attached property to position children.

## Related

- [C# how-to guide](../how-to/inputs-and-data.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/DockPanel.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryLayoutPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryLayoutPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/DockPanel.cs)
- [Control catalog](../controls.md)
