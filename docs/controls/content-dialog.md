# ContentDialog

## Description

Use ContentDialog for modal prompts that require an explicit choice (confirmations, errors, sign-in).

The images show the dialog while it is open. A closed dialog has no visible surface.

| Light | Dark |
| --- | --- |
| ![ContentDialog in light mode](../screenshots/controls/content-dialog-light.png) | ![ContentDialog in dark mode](../screenshots/controls/content-dialog-dark.png) |

## Example usage

```csharp
Fluence.Wpf.Controls.ContentDialog dialog = new Fluence.Wpf.Controls.ContentDialog()
{
    Title = "Delete file?",
    Content = "Roadmap.md will be permanently deleted.",
    PrimaryButtonText = "Delete",
    CloseButtonText = "Cancel",
};
Fluence.Wpf.ContentDialogResult result = await dialog.ShowAsync();
```

Call `ShowAsync` on the UI dispatcher while an owner window is active.

## Key properties

| Property | Default | Purpose |
| --- | --- | --- |
| `Title` | `null` | Dialog title. |
| `PrimaryButtonText` | Empty string | Label for the primary action. |
| `SecondaryButtonText` | Empty string | Label for the secondary action. |
| `CloseButtonText` | Empty string | Label for the close action. |
| `DefaultButton` | `None` | Identifies the default action. |
| `IsPrimaryButtonEnabled` | `true` | Enables the primary action. |

## State and behavior

ShowAsync presents a modal choice; button actions complete it with a result.

## Additional behavior

[FlyoutBase](flyout-base.md) is an abstract support type. `ContentDialog.ShowAsync` needs an active owner and must run on the UI dispatcher. See [dialogs and feedback](../how-to/dialogs-and-feedback.md).

## Events

`PrimaryButtonClick`, `SecondaryButtonClick`, and `CloseButtonClick` report actions; `Opened` and `Closed` report lifecycle changes.

## Related

- [C# how-to guide](../how-to/dialogs-and-feedback.md)

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/ContentDialog.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryMenusPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/ContentDialog.cs)
- [Control catalog](../controls.md)
