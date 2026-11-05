# DataGrid

[C# API](../index.md) / [Fluence.Wpf.Controls](index.md)

- **Assembly:** `Fluence.Wpf`
- **Namespace:** `Fluence.Wpf.Controls`

```csharp
public class DataGrid : System.Windows.Controls.DataGrid
```

Represents a table of bound rows and columns built on the WPF `DataGrid`. It covers the WinUI 3 `TableView` scenarios with WPF names.

**Remarks:** Column types, sorting, resizing, reordering, frozen leading columns, editing, `INotifyDataErrorInfo` validation, grouping and filtering through `ICollectionView`, and row virtualization work as they do in WPF.



When the grid loads and `GroupStyle` is empty, the grid shows each group under a collapsible header. [ExpandAllGroups](DataGrid.md#api-ad460bce098b) and [CollapseAllGroups](DataGrid.md#api-9e92579699a7) open or close those headers.



A frozen `SolidColorBrush` assigned to `HorizontalGridLinesBrush` or `VerticalGridLinesBrush` reads back as a grid-owned copy with the same color.

**Base type:** [`System.Windows.Controls.DataGrid`](https://learn.microsoft.com/dotnet/api/system.windows.controls.datagrid) (including inherited WPF and .NET members)

[C# source](https://github.com/sintaxasn/Fluence.Wpf/blob/main/Fluence.Wpf/Controls/DataGrid.cs)

## Constructors

<a id="api-25285712584c"></a>

### DataGrid

```csharp
public DataGrid()
```

Initializes a new instance of the [DataGrid](DataGrid.md) class.

## Properties

<a id="api-037c900e86ba"></a>

### CornerRadius

```csharp
public CornerRadius CornerRadius { get; set; }
```

Gets or sets the corner radius of the grid's outer border.

<a id="api-396df030d4b1"></a>

### EmptyContent

```csharp
public object? EmptyContent { get; set; }
```

Gets or sets the content shown over the grid while it has no rows. Set `CanUserAddRows` to `false` when the source is editable; otherwise the new-item row counts as a row.

<a id="api-590c6e2d3d64"></a>

### IsItemSelectable

```csharp
public bool IsItemSelectable { get; set; }
```

Gets or sets a value indicating whether rows and cells can be selected. Setting it to `false` clears the selection and suppresses the hover and selection visuals; it is the equivalent of WinUI TableView `SelectionMode="None"`. Cells stay focusable, so keyboard navigation works, and F2 or typing still begins editing. A mouse click does not begin editing, because the native cell starts a click edit only when it is selected. A click briefly selects the row or cell and then clears it, so `SelectedCellsChanged`, and `SelectionChanged` when whole rows are selected, report a selection and then its removal. With row selection, a two-way `SelectedItem` binding sees a transient value.

## Methods

<a id="api-9e92579699a7"></a>

### CollapseAllGroups

```csharp
public void CollapseAllGroups()
```

Collapses every realized group header of this grid that uses the built-in group header. Groups of a grid nested in a cell or the row details are left as they are.

<a id="api-ad460bce098b"></a>

### ExpandAllGroups

```csharp
public void ExpandAllGroups()
```

Expands every realized group header of this grid that uses the built-in group header. Groups of a grid nested in a cell or the row details are left as they are.

**Remarks:** Grouping turns off row virtualization unless `IsVirtualizingWhenGroupingProperty` is set, so by default every group is realized.

<a id="api-5cbd64b878b2"></a>

### OnSelectedCellsChanged

```csharp
protected override void OnSelectedCellsChanged(SelectedCellsChangedEventArgs e)
```

Clears a new cell selection when [IsItemSelectable](DataGrid.md#api-590c6e2d3d64) is `false`.

**Parameter `e`:** The selected-cells change.

<a id="api-9492ce067b82"></a>

### OnSelectionChanged

```csharp
protected override void OnSelectionChanged(SelectionChangedEventArgs e)
```

Clears a new row selection when [IsItemSelectable](DataGrid.md#api-590c6e2d3d64) is `false`.

**Parameter `e`:** The selection change.

## Dependency property identifiers

Use these identifiers with WPF property APIs. The matching CLR properties appear above when the control exposes them.

<a id="api-380de8d562f7"></a>

### CornerRadiusProperty

```csharp
public static readonly DependencyProperty CornerRadiusProperty
```

Identifies the [CornerRadius](DataGrid.md#api-037c900e86ba) dependency property.

<a id="api-68d0f2585721"></a>

### EmptyContentProperty

```csharp
public static readonly DependencyProperty EmptyContentProperty
```

Identifies the [EmptyContent](DataGrid.md#api-396df030d4b1) dependency property.

<a id="api-ff10871d144f"></a>

### IsItemSelectableProperty

```csharp
public static readonly DependencyProperty IsItemSelectableProperty
```

Identifies the [IsItemSelectable](DataGrid.md#api-590c6e2d3d64) dependency property.
