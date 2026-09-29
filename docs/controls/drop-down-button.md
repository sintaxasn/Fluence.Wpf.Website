# DropDownButton

## Description

Use DropDownButton when all available actions live in the flyout.

| Light | Dark |
| --- | --- |
| ![DropDownButton in light mode](../screenshots/controls/drop-down-button-light.png) | ![DropDownButton in dark mode](../screenshots/controls/drop-down-button-dark.png) |

## Example usage

```xml
<fluence:DropDownButton Content="New">
    <fluence:DropDownButton.Flyout>
        <StackPanel>
            <fluence:Button Content="Document" Command="{Binding NewDocumentCommand}" />
            <fluence:Button Content="Folder" Command="{Binding NewFolderCommand}" />
        </StackPanel>
    </fluence:DropDownButton.Flyout>
</fluence:DropDownButton>
```

Bind the two commands on the page's data context to make the flyout choices act on your content.

## State and behavior

Opening the flyout changes the button state; light dismissal closes it.

## Reference

- [C# API reference](../api/Fluence.Wpf.Controls/DropDownButton.md)
- [Gallery XAML source](../../Fluence.Wpf.Demo/Pages/GalleryButtonsPage.xaml)
- [Gallery C# source](../../Fluence.Wpf.Demo/Pages/GalleryButtonsPage.xaml.cs)
- [Control source](../../Fluence.Wpf/Controls/DropDownButton.cs)
- [Control catalog](../controls.md)
