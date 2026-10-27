# ListView

## Description

Set ItemsLayout to Grid when items read better as tiles that wrap across the list; List keeps one item per row.

Use it for a list of items, switching to a grid when tiles suit the content.

| Light | Dark |
| --- | --- |
| ![ListView in light mode](../screenshots/controls/list-view-light.png) | ![ListView in dark mode](../screenshots/controls/list-view-dark.png) |

## Example usage

```xml
<fluence:ListView ItemsLayout="Grid">
    <fluence:ListView.EmptyContent>
        <TextBlock Text="No people to show." />
    </fluence:ListView.EmptyContent>
    <ListViewItem Content="Ana Bowman" />
    <ListViewItem Content="Shawn Hughes" />
    <ListViewItem Content="Priya Kapoor" />
</fluence:ListView>
```

```csharp
var list = new Fluence.Wpf.Controls.ListView();
list.Items.Add("First");
```

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `ItemsLayout` | `List` | Selects list or grid layout. |
| `ItemAnimationsEnabled` | `true` | Enables item animations. |
| `HoverHighlightEnabled` | `true` | Enables the hover highlight. |
| `EmptyContent` | `null` | Content shown for an empty collection. |
| `CornerRadius` | `4` | Rounds the list surface. |

## State and behavior

Selection highlights a row. `ItemsLayout="Grid"` arranges items as tiles; change it to `List` for one item per row. `EmptyContent` appears when the collection is empty.

## Additional behavior

The theme also styles some native framework elements used inside these controls. A `ListViewItem` is the WPF container, not a separate public Fluence class.

## Events

The inherited `SelectionChanged` event reports a changed selection.

## Related

- [C# how-to guide](../how-to/inputs-and-data.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/ListView.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryDataPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryDataPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/ListView.cs)
- [Control catalog](../controls.md)
