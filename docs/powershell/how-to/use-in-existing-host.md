# Use Fluence from an existing PowerShell host

Use this guide when a script runs inside another WPF application or PowerShell host. The module can use an existing WPF application only when the Fluence command runs on that application's dispatcher thread.

## Import the module

Import the [installed module](../installation.md), or import the manifest by path when the module folder ships with your script. You can also [stage it from a source checkout](../../../Fluence.Wpf.PowerShell.Module/README.md#use-the-module-from-a-source-checkout).

```powershell
Import-Module Fluence.Wpf.PowerShell

# Or, when the module folder ships beside your script:
Import-Module (Join-Path $PSScriptRoot 'Fluence.Wpf.PowerShell/Fluence.Wpf.PowerShell.psd1')
```

Windows PowerShell 5.1 uses the `net472` library build. PowerShell 7.4 or later uses `net8.0-windows10.0.26100.0`.

<span id="understand-which-thread-displays-the-window"></span>

## Check the calling thread

Run the following in the host before showing a window:

```powershell
[System.Threading.Thread]::CurrentThread.GetApartmentState()
```

## Run on the host dispatcher

| Process and thread state | Module behavior |
| --- | --- |
| A WPF application exists and the command runs on its dispatcher thread | Reuses the application inline. |
| No WPF application exists and the caller is STA | Creates and uses an application on the caller's thread. |
| No WPF application exists and the caller is MTA | Uses a module-owned STA runspace for UI work. |
| A WPF application exists on another thread, with no module-owned UI runspace | Throws a host-thread error. |

Importing the module does not dispatch work onto another application's UI thread. Arrange for the script to run in the host's supported dispatcher context. If the host cannot do that, use a separate PowerShell process for the UI.

<span id="keep-runspace-callbacks-self-contained"></span>

## Pass data to callbacks on an MTA host

When the module sends a script block to its own UI runspace, it serializes the script block as text. Caller variables, functions, and closures do not travel with it. Put values needed by a callback in explicit parameters or in data supported by that command, and keep the callback self-contained. See [PowerShell UI threading](../explanation.md#where-the-ui-thread-comes-from) for the execution model.

For `Show-FluenceWindow`, pass a hashtable through `-Data`. The content block receives the window and that hashtable as parameters:

```powershell
$data = @{ Message = 'Ready' }
Show-FluenceWindow -Data $data -Content {
    param($Window, $Data)
    $text = [System.Windows.Controls.TextBlock]::new()
    $text.Text = $Data.Message
    $Window.Content = $text
}
```

<span id="use-dialog-results-in-the-host-script"></span>

For dialog result values, see [Dialogs and messages](dialogs.md).

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

## Clean up an application you own

If a standalone script owns the WPF application and has finished every UI operation, call `[System.Windows.Application]::Current.Dispatcher.InvokeShutdown()` on its dispatcher thread. This is terminal cleanup: do not open another WPF window in that process afterward. An embedded script must leave shutdown to its host.

## Related guides

- [Dialogs and messages](dialogs.md)
- [Forms and validation](forms-and-validation.md)
- [Progress windows](progress.md)
- [Command reference](../reference/README.md)
