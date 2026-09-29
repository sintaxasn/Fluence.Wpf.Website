# PowerShell basic usage

This short example builds a connection prompt and reads the answer. Complete [installation](installation.md) first. You need an interactive Windows desktop.

## 1. Import the module

For an installed module:

```powershell
Import-Module Fluence.Wpf.PowerShell
```

From a staged repository checkout, import the manifest path shown in [installation](installation.md#source-checkout). You can check the available functions with `Get-Command -Module Fluence.Wpf.PowerShell`.

## 2. Show a message

```powershell
$answer = Show-FluenceMessage -Title 'Setup' -Message 'Connect to a server?' -Icon Question -Buttons YesNo

if ($answer -ne 'Yes')
{
    return
}
```

The command returns the clicked button name, such as `Yes` or `No`. Closing a Yes/No message with Esc or the title bar returns `No`.

![Message dialog in light mode](images/message-light.png)

![Message dialog in dark mode](images/message-dark.png)

## 3. Ask for validated values

```powershell
$prompts = @(
    New-FluencePrompt -Name Server -Message 'Server name' -DefaultValue 'localhost' -ValidateNotEmpty
    New-FluencePrompt -Name Port -Message 'Port' -InputType Number -DefaultValue 443
)

$result = Show-FluenceDialog -Title 'Connection' -Message 'Where should the app connect?' -Prompts $prompts -Buttons 'Connect', 'Cancel'

if ($result.Connect)
{
    "Connecting to $($result.Server):$($result.Port)"
}
```

Clear the server name and choose Connect to see validation keep the dialog open. The result has a property for each named prompt and a Boolean flag for each button, plus `Cancelled` and `TimedOut`. Check the button flag before using input values.

![Form dialog in light mode](images/dialog-form-light.png)

![Form dialog in dark mode](images/dialog-form-dark.png)

## 4. Put it in a script

Save the following as `Connect.ps1` and run it from a PowerShell console after installing the module:

```powershell
Import-Module Fluence.Wpf.PowerShell

$answer = Show-FluenceMessage -Title 'Setup' -Message 'Connect to a server?' -Icon Question -Buttons YesNo
if ($answer -ne 'Yes')
{
    return
}

$prompts = @(
    New-FluencePrompt -Name Server -Message 'Server name' -DefaultValue 'localhost' -ValidateNotEmpty
    New-FluencePrompt -Name Port -Message 'Port' -InputType Number -DefaultValue 443
)
$result = Show-FluenceDialog -Title 'Connection' -Prompts $prompts -Buttons 'Connect', 'Cancel'

if ($result.Connect)
{
    Show-FluenceMessage -Message "Connecting to $($result.Server):$($result.Port)" -Icon Success
}
```

The example shows the UI and reads values; it does not open a network connection. Use the [forms walkthrough](how-to/forms-and-validation.md) for other input types and validation rules, or the [Functions Reference](reference/README.md) for parameters and return values.