# TeachingTip

## Description

Use TeachingTip for contextual, non-blocking coaching anchored to a UI element.

| Light | Dark |
| --- | --- |
| ![TeachingTip in light mode](../screenshots/controls/teaching-tip-light.png) | ![TeachingTip in dark mode](../screenshots/controls/teaching-tip-dark.png) |

## Example usage

```xml
<Grid>
    <fluence:Button x:Name="TipAnchor" Content="Feature" />
    <fluence:TeachingTip
        Title="Pro tip"
        Subtitle="This feature keeps your recent work close."
        Target="{Binding ElementName=TipAnchor}"
        IsOpen="True"
        CloseButtonContent="Got it" />
</Grid>
```


```csharp
var tip = new Fluence.Wpf.Controls.TeachingTip { Title = "Tip", IsOpen = true };
```


## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `Title` | Empty string | Main instruction text. |
| `Subtitle` | Empty string | Supporting text. |
| `Target` | `null` | Element used to position the tip. |
| `IsOpen` | `false` | Shows or hides the tip. |
| `PreferredPlacement` | `Auto` | Preferred position relative to the target. |
| `IsLightDismissEnabled` | `false` | Allows dismissal by interacting outside the tip. |

## State and behavior

IsOpen shows contextual coaching; action or close controls update its open state.

## Events

`ActionButtonClick`, `CloseButtonClick`, and `Closed` report the respective actions and closure.

## Related

- [C# how-to guide](../how-to/dialogs-and-feedback.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/TeachingTip.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/TeachingTip.cs)
- [Control catalog](../controls.md)
