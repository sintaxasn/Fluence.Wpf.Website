# SlideNavigationPresenter

## Description

SlideNavigationPresenter animates content changes. Set `TransitionEffect` to choose the incoming direction.

Use it when content changes should slide in a direction selected by the caller.

| Light | Dark |
| --- | --- |
| ![SlideNavigationPresenter in light mode](../screenshots/controls/slide-navigation-presenter-light.png) | ![SlideNavigationPresenter in dark mode](../screenshots/controls/slide-navigation-presenter-dark.png) |

## Example usage

```xml
<fluence:SlideNavigationPresenter
    x:Name="SectionHost"
    TransitionEffect="FromRight">
    <TextBlock Text="Current page" />
</fluence:SlideNavigationPresenter>
```

With a page already displayed, set the effect before replacing `Content`. For backward navigation, use `FromLeft`:

```csharp
SectionHost.TransitionEffect = Fluence.Wpf.SlideNavigationTransitionEffect.FromLeft;
SectionHost.Content = new System.Windows.Controls.TextBlock { Text = "Previous view" };
```


## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `TransitionEffect` | `FromRight` | Choose `FromRight` or `FromLeft` before changing content. |
| `Content` | `null` | The currently displayed content. |

## State and behavior

The default is `FromRight`. The control does not infer navigation direction; the caller sets `FromLeft` before a backward change.

## Related

- [C# how-to guide](../how-to/navigation-and-tabs.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/SlideNavigationPresenter.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryNavigationPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/SlideNavigationPresenter.cs)
- [Control catalog](../controls.md)
