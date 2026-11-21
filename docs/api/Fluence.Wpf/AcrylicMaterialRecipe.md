# AcrylicMaterialRecipe

[C# API](../index.md) / [Fluence.Wpf](index.md)

- **Assembly:** `Fluence.Wpf`
- **Namespace:** `Fluence.Wpf`

```csharp
public sealed class AcrylicMaterialRecipe : Freezable
```

Stores the value inputs used to create an acrylic material.

**Base type:** [`Freezable`](https://learn.microsoft.com/dotnet/api/system.windows.freezable) (including inherited WPF and .NET members)

[C# source](https://github.com/sintaxasn/Fluence.Wpf/blob/main/Fluence.Wpf/AcrylicMaterialRecipe.cs)

## Constructors

<a id="api-89dc0d2da034"></a>

### AcrylicMaterialRecipe

```csharp
public AcrylicMaterialRecipe()
```

Creates a new `AcrylicMaterialRecipe` instance.

## Properties

<a id="api-9660eccf0b99"></a>

### AlwaysUseFallback

```csharp
public bool AlwaysUseFallback { get; set; }
```

Gets or sets whether the material should always use its fallback color.

<a id="api-d9baf23cdea4"></a>

### FallbackColor

```csharp
public Color FallbackColor { get; set; }
```

Gets or sets the fallback color. The supplied alpha channel is preserved.

<a id="api-38141651cd39"></a>

### TintColor

```csharp
public Color TintColor { get; set; }
```

Gets or sets the tint color used by the material.

<a id="api-03b1b0d00267"></a>

### TintLuminosityOpacity

```csharp
public double? TintLuminosityOpacity { get; set; }
```

Gets or sets explicit luminosity opacity, or `null` for automatic luminosity.

<a id="api-b404fc9c307b"></a>

### TintOpacity

```csharp
public double TintOpacity { get; set; }
```

Gets or sets tint opacity, clamped to the inclusive range from zero to one.

## Methods

<a id="api-21c83b22558f"></a>

### CreateInstanceCore

```csharp
protected override Freezable CreateInstanceCore()
```

Documentation inherited from the [`Freezable` API](https://learn.microsoft.com/dotnet/api/system.windows.freezable).

## Dependency property identifiers

Use these identifiers with WPF property APIs. The matching CLR properties appear above when the control exposes them.

<a id="api-49dc9c69d3ea"></a>

### AlwaysUseFallbackProperty

```csharp
public static readonly DependencyProperty AlwaysUseFallbackProperty
```

Identifies the [AlwaysUseFallback](AcrylicMaterialRecipe.md#api-9660eccf0b99) dependency property.

<a id="api-da1cdb89e806"></a>

### FallbackColorProperty

```csharp
public static readonly DependencyProperty FallbackColorProperty
```

Identifies the [FallbackColor](AcrylicMaterialRecipe.md#api-d9baf23cdea4) dependency property.

<a id="api-ff42c322dfa9"></a>

### TintColorProperty

```csharp
public static readonly DependencyProperty TintColorProperty
```

Identifies the [TintColor](AcrylicMaterialRecipe.md#api-38141651cd39) dependency property.

<a id="api-077efc82372e"></a>

### TintLuminosityOpacityProperty

```csharp
public static readonly DependencyProperty TintLuminosityOpacityProperty
```

Identifies the [TintLuminosityOpacity](AcrylicMaterialRecipe.md#api-03b1b0d00267) dependency property.

<a id="api-7307db92f637"></a>

### TintOpacityProperty

```csharp
public static readonly DependencyProperty TintOpacityProperty
```

Identifies the [TintOpacity](AcrylicMaterialRecipe.md#api-b404fc9c307b) dependency property.
