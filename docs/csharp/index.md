# Introduction to the C# library

Fluence.Wpf is a WPF control library for applications that want Fluent interaction patterns without replacing WPF’s binding, command, templating, or dispatcher model. You can add one control to an existing window or use the full Fluent window and theme pipeline.

## The shortest path to a working window

1. Check [requirements](requirements.md) for supported Windows and target frameworks.
2. [Install the package or add a project reference](installation.md).
3. Follow the [basic walkthrough](usage.md) to apply a theme, create a `FluenceWindow`, and add a control.
4. Run the [gallery](gallery.md) when you want to compare complete examples or inspect the interaction patterns together.

The library targets .NET Framework 4.7.2, .NET 8 for Windows, and .NET 10 for Windows. Windows 10 version 1809 is the baseline. Windows 11-only effects such as Mica light up when the operating system supports them and fall back to the configured surface when they do not. The consuming application does not need the Windows App SDK or WinUI runtime.

## Choose the next reference

- Use the [control catalog](../controls.md) to choose a control by task, such as navigation, input, dialogs, status, or layout.
- Use the [walkthroughs](../how-to/window-and-title-bar.md) for focused implementations of window chrome, themes and accents, inputs, navigation, and dialogs.
- Use the [C# API reference](../api/index.md) for exact properties, methods, events, enums, and namespaces.
- Read the [theme guide](../theming.md) for DynamicResource keys, accent roles, high contrast behavior, or theme-aware markup.
- Read the [accessibility reference](../reference/accessibility.md) before shipping keyboard, automation, high contrast, or right-to-left experiences.

## What belongs in the application

Fluence supplies controls, templates, theme resources, window chrome, automation peers, and markup extensions. Your application still owns view models, navigation history, command behavior, persistence, and application startup. A control’s API follows WPF conventions unless its documentation calls out a Fluent-specific behavior.

The library is available under the [BSD 3-Clause license](license.md).
