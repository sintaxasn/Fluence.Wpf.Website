# AcrylicBrushExtension

[C# API](../index.md) / [Fluence.Wpf](index.md)

- **Assembly:** `Fluence.Wpf`
- **Namespace:** `Fluence.Wpf`

```csharp
public sealed class AcrylicBrushExtension : MarkupExtension
```

Provides one in-app acrylic visual brush for a concrete supported XAML target.

**Base type:** [`MarkupExtension`](https://learn.microsoft.com/dotnet/api/system.windows.markup.markupextension) (including inherited WPF and .NET members)

[C# source](https://github.com/sintaxasn/Fluence.Wpf/blob/main/Fluence.Wpf/AcrylicBrushExtension.cs)

## Constructors

<a id="api-a1a347511701"></a>

### AcrylicBrushExtension

```csharp
public AcrylicBrushExtension()
```

Initializes a new acrylic brush markup extension.

<a id="api-660f8884b1f8"></a>

### AcrylicBrushExtension

```csharp
public AcrylicBrushExtension(string backdropSourceName)
```

Initializes a new acrylic brush markup extension with a backdrop source name.

**Parameter `backdropSourceName`:** The name of a source in the target's namescope.

## Properties

<a id="api-7cca0dd17a38"></a>

### BackdropSourceName

```csharp
public string BackdropSourceName { get; set; }
```

Gets or sets the required name of the same-window backdrop source.

<a id="api-1fc873808460"></a>

### Recipe

```csharp
public AcrylicMaterialRecipe? Recipe { get; set; }
```

Gets or sets the fixed recipe values used by this brush instance.

## Methods

<a id="api-7901cde6610c"></a>

### ProvideValue

```csharp
public override object ProvideValue(IServiceProvider serviceProvider)
```

Creates a distinct visual brush for a concrete Border or supported Shape fill.

**Parameter `serviceProvider`:** The XAML service provider for this use.

**Returns:** A per-use `VisualBrush`.

**Exception `System.ArgumentNullException`:** The XAML service provider is missing.

**Exception `System.InvalidOperationException`:** The backdrop source name is empty.

**Exception `System.NotSupportedException`:** The XAML target does not have a concrete supported brush property.

## Related types

- [Fluence.Wpf.AcrylicMaterialRecipe](AcrylicMaterialRecipe.md)
