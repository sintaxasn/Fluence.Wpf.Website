# PowerShell introduction

`Fluence.Wpf.PowerShell` gives Windows PowerShell and PowerShell 7 scripts dialogs, validated forms, progress windows, and custom WPF windows. Use it when a script needs a small operator-facing UI without building a separate application.

## The shortest path to a useful prompt

1. Check [requirements](requirements.md) for supported Windows and PowerShell versions.
2. [Install the module](installation.md).
3. Follow [basic usage](usage.md) to import the module, show a message, and read a result.
4. Choose a focused task below when the first prompt works.

Use [controls and dialogs](controls.md) to compare the available interfaces. Use the [functions reference](reference/README.md) for exact parameters, validation, return values, and lifecycle behavior.

The module keeps WPF work on its UI thread. Your script owns the work and decides what each result means. Dialog functions return typed result objects or values; they do not decide whether your operation should continue, retry, or roll back. Read the [module architecture](explanation.md) before sharing UI state across runspaces or embedding the module in a host that already has a WPF application.

## Walkthroughs

- [Show dialogs and messages](how-to/dialogs.md)
- [Build forms and validate answers](how-to/forms-and-validation.md)
- [Show progress during long work](how-to/progress.md)
- [Host a custom window from XAML](how-to/windows-from-xaml.md)
- [Change theme, accent, and backdrop](how-to/theming-at-runtime.md)
- [Use the module in an existing WPF host](how-to/use-in-existing-host.md)

The [runnable examples](../../Fluence.Wpf.PowerShell.Module/examples/README.md) provide complete scripts. [Architecture](explanation.md) explains the module's assembly and UI threading model, and [Contributing](contributing.md) covers source changes.

The ControlsTour example shows the module's windows in both themes.

![ControlsTour window in light mode](../screenshots/powershell-light.png)

![ControlsTour window in dark mode](../screenshots/powershell-dark.png)
