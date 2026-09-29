# Use Fluence from an existing PowerShell host

Use this guide when a script runs inside another WPF application or PowerShell host. The module can use an existing WPF application only when the Fluence command runs on that application's dispatcher thread.

## Import the module

Import the module from its release package, or [stage it from a source checkout](../../../Fluence.Wpf.PowerShell.Module/README.md#use-the-module-from-a-source-checkout):

```powershell
Import-Module (Join-Path $PSScriptRoot 'SupportFiles/Fluence.Wpf.PowerShell/Fluence.Wpf.PowerShell.psd1')
```

Windows PowerShell 5.1 uses the `net472` library build. PowerShell 7.4 or later uses `net8.0-windows10.0.26100.0`.

## Understand which thread displays the window

| Process and thread state | Module behavior |
| --- | --- |
| A WPF application exists and the command runs on its dispatcher thread | Reuses the application inline. |
| No WPF application exists and the caller is STA | Creates and uses an application on the caller's thread. |
| No WPF application exists and the caller is MTA | Uses a module-owned STA runspace for UI work. |
| A WPF application exists on another thread, with no module-owned UI runspace | Throws a host-thread error. |

Importing the module does not dispatch work onto another application's UI thread. Arrange for the script to run in the host's supported dispatcher context. If the host cannot do that, use a separate PowerShell process for the UI.

## Keep runspace callbacks self-contained

When the module sends a script block to its own UI runspace, it serializes the script block as text. Caller variables, functions, and closures do not travel with it. Put values needed by a callback in explicit parameters or in data supported by that command, and keep the callback self-contained. See [PowerShell UI threading](../explanation.md#where-the-ui-thread-comes-from) for the execution model.

## Use dialog results in the host script

Fluence returns values; the host decides what those values mean. For example:

```powershell
$result = Show-FluenceMessage -Message 'Continue?' -Buttons YesNo -DefaultButton No

if ($result -eq 'Yes')
{
    # Continue the operation.
}
```

A restart prompt returns `Restart`, `Later`, or `TimedOut`; it does not restart the computer. A progress window returns a handle that the script passes to `Update-FluenceProgress` and `Close-FluenceProgress`.

## Handle noninteractive execution

Only show a window when the process has an interactive desktop and the host can service WPF UI. Choose an explicit noninteractive path in the host script:

```powershell
if ([System.Environment]::UserInteractive)
{
    $answer = Show-FluenceMessage -Message 'Continue?' -Buttons YesNo -DefaultButton No -Timeout 60
}
else
{
    $answer = 'No'
}
```

A timeout handles an interactive session where nobody responds. See [dialog and message guidance](dialogs.md) for the result values.

## Related guides

- [Dialogs and messages](dialogs.md)
- [Forms and validation](forms-and-validation.md)
- [Progress windows](progress.md)
- [Command reference](../reference/README.md)
