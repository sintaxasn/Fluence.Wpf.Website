# AcrylicElement

[C# API](../index.md) / [Fluence.Wpf.Controls](index.md)

- **Assembly:** `Fluence.Wpf`
- **Namespace:** `Fluence.Wpf.Controls`

```csharp
public sealed class AcrylicElement : ContentControl
```

Shows an in-app acrylic backdrop behind unprocessed content.

**Base type:** [`ContentControl`](https://learn.microsoft.com/dotnet/api/system.windows.controls.contentcontrol) (including inherited WPF and .NET members)

[C# source](https://github.com/sintaxasn/Fluence.Wpf/blob/main/Fluence.Wpf/Controls/AcrylicElement.cs)

## Constructors

<a id="api-79278ca50afc"></a>

### AcrylicElement

```csharp
public AcrylicElement()
```

Initializes an acrylic content host.

## Properties

<a id="api-9f0e0672a85a"></a>

### BackdropSource

```csharp
public FrameworkElement? BackdropSource { get; set; }
```

Gets or sets a separate, same-window backdrop source.

<a id="api-96f9a3e43ba6"></a>

### IsUsingFallback

```csharp
public bool IsUsingFallback { get; }
```

Gets whether the host currently paints an opaque fallback.

<a id="api-964eea5a9f09"></a>

### Recipe

```csharp
public AcrylicMaterialRecipe? Recipe { get; set; }
```

Gets or sets material values; null uses class defaults.

## Methods

<a id="api-65b9e7cfe129"></a>

### OnApplyTemplate

```csharp
public override void OnApplyTemplate()
```

Documentation inherited from the [`ContentControl` API](https://learn.microsoft.com/dotnet/api/system.windows.controls.contentcontrol).

## Dependency property identifiers

Use these identifiers with WPF property APIs. The matching CLR properties appear above when the control exposes them.

<a id="api-c58935f39fbf"></a>

### BackdropSourceProperty

```csharp
public static readonly DependencyProperty BackdropSourceProperty
```

Identifies the [BackdropSource](AcrylicElement.md#api-9f0e0672a85a) dependency property.

<a id="api-b135856f7151"></a>

### IsUsingFallbackProperty

```csharp
public static readonly DependencyProperty IsUsingFallbackProperty
```

Identifies the read-only [IsUsingFallback](AcrylicElement.md#api-96f9a3e43ba6) dependency property.

<a id="api-90a812d9af3c"></a>

### RecipeProperty

```csharp
public static readonly DependencyProperty RecipeProperty
```

Identifies the [Recipe](AcrylicElement.md#api-964eea5a9f09) dependency property.

## Related types

- [Fluence.Wpf.AcrylicMaterialRecipe](../Fluence.Wpf/AcrylicMaterialRecipe.md)
