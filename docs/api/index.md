# C# API reference

Public and protected members of the Fluence.Wpf assembly, generated from the compiled .NET 10 API and its XML documentation. Protected members are labeled for control authors. Framework members inherited from WPF are linked through the base type; they are not repeated on every page.

For task-oriented examples, see the [control catalog](../controls.md), [Basic walkthrough](../csharp/usage.md), and [theme resources](../theming.md).

## Common starting points

| Task | API | Usage guide |
| --- | --- | --- |
| Create a window | [FluenceWindow](Fluence.Wpf.Controls/FluenceWindow.md), [TitleBar](Fluence.Wpf.Controls/TitleBar.md) | [Window and title bar](../how-to/window-and-title-bar.md) |
| Build a first window | [Button](Fluence.Wpf.Controls/Button.md), [StackPanel](Fluence.Wpf.Controls/StackPanel.md) | [Basic walkthrough](../csharp/usage.md) |
| Set a theme | [ApplicationThemeManager](Fluence.Wpf/ApplicationThemeManager.md), [SystemThemeWatcher](Fluence.Wpf/SystemThemeWatcher.md) | [Theme and accent](../how-to/theme-and-accent.md) |
| Choose an accent | [ApplicationAccentColorManager](Fluence.Wpf/ApplicationAccentColorManager.md) | [Theme resources](../theming.md) |
| Show a dialog | [ContentDialog](Fluence.Wpf.Controls/ContentDialog.md) | [Dialogs and feedback](../how-to/dialogs-and-feedback.md) |
| Navigate between pages | [NavigationView](Fluence.Wpf.Controls/NavigationView.md), [TabView](Fluence.Wpf.Controls/TabView.md) | [Navigation and tabs](../how-to/navigation-and-tabs.md) |

## Member scope

API pages document members declared by each Fluence type and identify its base type. Inherited WPF members remain part of the API. Protected members are intended for derived controls. For dependency properties, the CLR property is usually the value an application sets; the corresponding static `...Property` field identifies the dependency property. Attached properties use their documented `Get...` and `Set...` methods.

## Template and resource contracts

Default control templates live in `Themes/Controls/` and are merged by `Themes/Generic.xaml`. Named parts and visual states are documented on their CLR type and in the template. The [theme resource reference](../theming.md) describes supported application-wide color, brush, typography, and metric keys. The [PowerShell command reference](../powershell/reference/README.md) is separate from the CLR API.

## Namespaces

- [Fluence.Wpf](Fluence.Wpf/index.md) (54 types)
- [Fluence.Wpf.Automation](Fluence.Wpf.Automation/index.md) (28 types)
- [Fluence.Wpf.Controls](Fluence.Wpf.Controls/index.md) (68 types)
- [Fluence.Wpf.Markup](Fluence.Wpf.Markup/index.md) (4 types)
