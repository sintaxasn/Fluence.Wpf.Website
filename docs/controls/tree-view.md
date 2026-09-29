# TreeView

## Description

Use TreeViewItem nesting for compact folder, outline, or category hierarchies.

| Light | Dark |
| --- | --- |
| ![TreeView in light mode](../screenshots/controls/tree-view-light.png) | ![TreeView in dark mode](../screenshots/controls/tree-view-dark.png) |

## Example usage

```xml
<fluence:TreeView>
    <fluence:TreeViewItem Header="Workspace" IsExpanded="True">
        <fluence:TreeViewItem Header="Pages" />
    </fluence:TreeViewItem>
</fluence:TreeView>
```

## State and behavior

Nodes expand and collapse; selection can be single or multiple.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/TreeView.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryTreesPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryTreesPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/TreeView.cs)
- [Control catalog](../controls.md)
