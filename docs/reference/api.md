# C# API reference

Browse the [complete C# API reference](../api/index.md) for type declarations, constructors, properties, methods, events, and enums. Each type page includes the library's XML documentation and links to related types.

| Namespace | What to find there |
| --- | --- |
| [`Fluence.Wpf`](../api/Fluence.Wpf/index.md) | Theme and accent managers, theme watcher, enums, event arguments, typography helpers |
| [`Fluence.Wpf.Controls`](../api/Fluence.Wpf.Controls/index.md) | Windows, controls, attached-property helpers, and layout primitives |
| [`Fluence.Wpf.Markup`](../api/Fluence.Wpf.Markup/index.md) | `ThemeResourceExtension`, `ThemeDictionary`, and related dictionary types |
| [`Fluence.Wpf.Automation`](../api/Fluence.Wpf.Automation/index.md) | UI Automation peers for custom controls |

## Common starting points

| Task | API | Usage guide |
| --- | --- | --- |
| Create a window | [FluenceWindow](../api/Fluence.Wpf.Controls/FluenceWindow.md), [TitleBar](../api/Fluence.Wpf.Controls/TitleBar.md) | [Window and title bar](../how-to/window-and-title-bar.md) |
| Construct a visual tree in code | [Button](../api/Fluence.Wpf.Controls/Button.md), [StackPanel](../api/Fluence.Wpf.Controls/StackPanel.md) | [Create controls in C#](../how-to/controls-from-csharp.md) |
| Set a theme | [ApplicationThemeManager](../api/Fluence.Wpf/ApplicationThemeManager.md), [SystemThemeWatcher](../api/Fluence.Wpf/SystemThemeWatcher.md) | [Theme and accent](../how-to/theme-and-accent.md) |
| Choose an accent | [ApplicationAccentColorManager](../api/Fluence.Wpf/ApplicationAccentColorManager.md) | [Theme resources](../theming.md) |
| Show a dialog | [ContentDialog](../api/Fluence.Wpf.Controls/ContentDialog.md) | [Dialogs and feedback](../how-to/dialogs-and-feedback.md) |
| Navigate between pages | [NavigationView](../api/Fluence.Wpf.Controls/NavigationView.md), [TabView](../api/Fluence.Wpf.Controls/TabView.md) | [Navigation and tabs](../how-to/navigation-and-tabs.md) |

For visual examples, use the [control catalog](../controls.md). The [gallery XAML and code-behind](../../Fluence.Wpf.Demo/Pages/) provide runnable examples.

## Member scope

API pages document the members declared by each Fluence type. They also identify its base type: inherited WPF members such as `Window.Show`, `Button.Click`, and `FrameworkElement.DataContext` remain part of the control's API. Protected members are intended for derived controls.

For dependency properties, the CLR property is usually the value an application sets. The corresponding static `...Property` field identifies that dependency property for binding, metadata, and dynamic resource references. Attached properties use their documented `Get...` and `Set...` methods.

## Template and resource contracts

Default control templates live in [`Themes/Controls/`](../../Fluence.Wpf/Themes/Controls/) and are merged by `Themes/Generic.xaml`. A template's named parts and visual states are documented on its CLR type and in its template. Those implementation details can change when the control changes. The supported application-wide color, brush, typography, and metric keys are described in [the theme resource reference](../theming.md).

The [PowerShell command reference](../powershell/reference/README.md) is separate from the CLR API. It is generated from the exported functions' comment-based help.
