# TreeViewItem

## Description

TreeViewItem represents an expandable node inside TreeView. `TreeViewItem` is shown within `TreeView`; it is not a separate gallery destination.

Use it for a node within a TreeView hierarchy.

| Light | Dark |
| --- | --- |
| ![TreeViewItem in light mode](../screenshots/controls/tree-view-item-light.png) | ![TreeViewItem in dark mode](../screenshots/controls/tree-view-item-dark.png) |

## Example usage

```xml
<fluence:TreeView>
    <fluence:TreeViewItem Header="Workspace" IsExpanded="True">
        <fluence:TreeViewItem Header="Pages" />
    </fluence:TreeViewItem>
</fluence:TreeView>
```

## State and behavior

IsExpanded reveals children; selection and pointer states change the row.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/TreeViewItem.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryTreesPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryTreesPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/TreeViewItem.cs)
- [Control catalog](../controls.md)
