# How the repository fits together

This is the repository map for the C# library. Continue with [WinUI 3 parity and WPF differences](../winui-parity.md), [Theme Resources](../theming.md), and [Accessibility](../reference/accessibility.md) for the other architecture topics.

Fluence.Wpf is a WPF control library with a gallery, an MVVM sample, tests, and a PowerShell module. The library provides the runtime behavior; applications choose whether to use its window shell, individual controls, or the PowerShell interface.

## Projects and responsibilities

| Location | Responsibility |
| --- | --- |
| [`Fluence.Wpf/`](../../Fluence.Wpf/) | Multi-targeted library, control types, templates, theme engine, markup extensions, and automation peers |
| [`Fluence.Wpf.Demo/`](../../Fluence.Wpf.Demo/) | Gallery of live controls, source examples, theme switching, and visual verification |
| [`Fluence.Wpf.Demo.Mvvm/`](../../Fluence.Wpf.Demo.Mvvm/) | Task Manager sample using CommunityToolkit.Mvvm |
| [`Fluence.Wpf.Tests/`](../../Fluence.Wpf.Tests/) | Control, theme, windowing, gallery, and resource contract tests |
| [`Fluence.Wpf.Tests.Smoke/`](../../Fluence.Wpf.Tests.Smoke/) | .NET 8 smoke lane |
| [`Fluence.Wpf.PowerShell.Module/`](../../Fluence.Wpf.PowerShell.Module/) | Script module, build and packaging scripts, examples, and Pester tests; intentionally outside the solution |

## Control and resource path

`ApplicationThemeManager.Apply` starts the theme engine. The engine resolves a concrete theme and accent, builds the published colors and brushes, and installs them in `Application.Resources`. `Themes/Generic.xaml` supplies the default control templates. A control such as `Button` or `NavigationView` reads those resources with dynamic lookup, so a publish updates an open application without recreating its controls. [Theme Resources](../theming.md) describes publication and supported keys.

The public control classes live in `Fluence.Wpf.Controls`. Most inherit the corresponding WPF type. Where inheritance does not fit, the library uses a separate templated control or an attached-property helper. The [control catalog](../controls.md) identifies those cases. Template XAML is organized by control under `Fluence.Wpf/Themes/Controls/` and merged through `Generic.xaml`.

## Markup and accessibility

`Fluence.Wpf.Markup` offers `ThemeResourceExtension` and per-theme resource dictionaries. The assembly maps the XML namespace `http://schemas.fluencewpf.com` to the core, control, and markup namespaces. Custom controls expose UI Automation peers under `Fluence.Wpf.Automation`; the [accessibility reference](../reference/accessibility.md) points to the relevant contracts and tests.

## PowerShell path

The module's build script stages the library's Release .NET Framework and .NET 8 assemblies under the module directory. Its public functions create dialogs, forms, progress windows, and full WPF windows. The module chooses a compatible assembly and arranges an STA UI context when needed. See the [PowerShell explanation](../powershell/explanation.md) for its lifetime and threading model.

## Change boundaries

The `PublicAPI` baseline files track the C# API. A frozen `PublicKeys.txt` inventory tracks the resource keys. The PowerShell command reference comes from comment-based help in the exported functions.
