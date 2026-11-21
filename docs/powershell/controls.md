# PowerShell controls and dialogs

Choose the interface that gives your script the answer it needs. Images illustrate the type of interface; actual fields and options vary:

| Need | Start with |
| --- | --- |
| Show a message or ask Yes/No | [Show-FluenceMessage](reference/Show-FluenceMessage.mdx)<br />![Example in light mode](images/message-light.png) |
| Ask for one value | [Get-FluenceInput](reference/Get-FluenceInput.mdx)<br />Illustrative form:<br />![Example in light mode](images/dialog-form-light.png) |
| Ask for one or more list items | [Show-FluenceListSelection](reference/Show-FluenceListSelection.mdx)<br />![Example in light mode](images/list-selection-light.png) |
| Collect several validated values | [Show-FluenceDialog](reference/Show-FluenceDialog.mdx) and [New-FluencePrompt](reference/New-FluencePrompt.mdx)<br />![Example in light mode](images/dialog-form-light.png) |
| Report work in progress | [Show-FluenceProgress](reference/Show-FluenceProgress.mdx)<br />![Example in light mode](images/progress-light.png) |
| Show a deployment restart choice | [Show-FluenceRestartPrompt](reference/Show-FluenceRestartPrompt.mdx)<br />![Example in light mode](images/restart-prompt-light.png) |
| Build a custom interface | [Show-FluenceWindow](reference/Show-FluenceWindow.mdx)<br />![Example in light mode](images/xaml-window-light.png) |
| Show rows of PowerShell objects in a table | [Show-FluenceWindow](reference/Show-FluenceWindow.mdx) with a Fluence `DataGrid`; see [Bind PowerShell objects to a DataGrid](how-to/windows-from-xaml.md#bind-powershell-objects-to-a-datagrid) |

The [input type reference](reference/input-types.md) lists prompt types, values, defaults, and validation behavior. The [result object reference](reference/result-objects.md) explains what commands return.

For examples, use the [dialogs](how-to/dialogs.md), [forms](how-to/forms-and-validation.md), [progress](how-to/progress.md), and [custom window](how-to/windows-from-xaml.md) walkthroughs. The [ControlsTour example](https://github.com/sintaxasn/Fluence.Wpf/blob/main/Fluence.Wpf.PowerShell.Module/examples/06-ControlsTour.ps1) shows the visual surface. Browse the [control catalog](../controls.md) when you need underlying C# controls for a custom window.

## Explore the Controls Tour

The [Controls Tour script](https://github.com/sintaxasn/Fluence.Wpf/blob/60a59e29ee7e9fb206003e3759e369f85f704b90/Fluence.Wpf.PowerShell.Module/examples/06-ControlsTour.ps1#L31-L37) opens on Inputs and uses ten category buttons to switch between pages. It demonstrates the controls together with common variations and event handling. The examples are composed in a custom `FluenceWindow`; the prompt commands above remain the shorter choice when their built-in interaction fits your task.

| Category | Examples and variations |
| --- | --- |
| Inputs | Single-line and multiline text, search suggestions, password reveal and strength indicators, standard and editable choices, inline and compact number steppers, date selection, and 12-hour and 24-hour time. |
| Color | Full color picker with spectrum and channel controls, plus a selected-color readout. |
| Selection | Toggle, checked and indeterminate check boxes, radio buttons, toggle button, horizontal and vertical sliders, editable and read-only ratings, multiple-selection list and tree, and list and grid layouts. |
| Commands | Standard, accent, subtle, and disabled buttons; hyperlink and repeat buttons; drop-down, split, and toggle split buttons; flyouts, a command bar flyout, tooltips, menus, and context menus. |
| Data | A sortable DataGrid bound to five PowerShell objects, with row selection reported in a shared InfoBar; TabView tabs that can be added, closed, and pinned; BreadcrumbBar; PipsPager; SelectorBar; and SlideNavigationPresenter. |
| Navigation | NavigationView in Left, Top, and LeftCompact modes. |
| Status | Progress states, InfoBar severities, count, dot, and icon badges, and profile pictures. |
| Surfaces | ContentDialog with Save, Discard, and Cancel actions; TeachingTip; Expander; borders; TitleBar; and FlyoutPresenter. |
| Layout | DockPanel, StackPanel, separators, SmoothScrollViewer with themed scrollbar, icons, Image, typography, and all four Card styles. |
| Acrylic | Moving source colors and a solid fallback switch for an in-app acrylic surface. |

Use a prompt command such as `Show-FluenceDialog` when its supported prompts and result object match the interaction you need. Use `Show-FluenceWindow` when you need to arrange controls in your own XAML or create a different interaction with event handlers. The [Windows from XAML guide](how-to/windows-from-xaml.md) explains those patterns.

On **Acrylic**, select **Move source colors** to see the backdrop change and **Use solid fallback** to switch it to an opaque fill. The current mode appears beside the sample. The Acrylic captures show the solid fallback selected. [Add in-app acrylic to a custom window](how-to/windows-from-xaml.md#add-an-in-app-acrylic-surface)

### Tour appearance by category

Each category has a Light and Dark capture. Expand a category to compare its page in both themes.

<details>
<summary>Inputs</summary>

![ControlsTour Inputs page in Light theme](../screenshots/powershell-light.png)
![ControlsTour Inputs page in Dark theme](../screenshots/powershell-dark.png)
</details>

<details>
<summary>Color</summary>

![ControlsTour Color page in Light theme](../screenshots/powershell-color-light.png)
![ControlsTour Color page in Dark theme](../screenshots/powershell-color-dark.png)
</details>

<details>
<summary>Selection</summary>

![ControlsTour Selection page in Light theme](../screenshots/powershell-selection-light.png)
![ControlsTour Selection page in Dark theme](../screenshots/powershell-selection-dark.png)
</details>

<details>
<summary>Commands</summary>

![ControlsTour Commands page in Light theme](../screenshots/powershell-commands-light.png)
![ControlsTour Commands page in Dark theme](../screenshots/powershell-commands-dark.png)
</details>

<details>
<summary>Data</summary>

![ControlsTour Data page in Light theme](../screenshots/powershell-data-light.png)
![ControlsTour Data page in Dark theme](../screenshots/powershell-data-dark.png)
</details>

<details>
<summary>Navigation</summary>

![ControlsTour Navigation page in Light theme](../screenshots/powershell-navigation-light.png)
![ControlsTour Navigation page in Dark theme](../screenshots/powershell-navigation-dark.png)
</details>

<details>
<summary>Status</summary>

![ControlsTour Status page in Light theme](../screenshots/powershell-status-light.png)
![ControlsTour Status page in Dark theme](../screenshots/powershell-status-dark.png)
</details>

<details>
<summary>Surfaces</summary>

![ControlsTour Surfaces page in Light theme](../screenshots/powershell-surfaces-light.png)
![ControlsTour Surfaces page in Dark theme](../screenshots/powershell-surfaces-dark.png)
</details>

<details>
<summary>Layout</summary>

![ControlsTour Layout page in Light theme](../screenshots/powershell-layout-light.png)
![ControlsTour Layout page in Dark theme](../screenshots/powershell-layout-dark.png)
</details>

<details>
<summary>Acrylic</summary>

![Controls Tour acrylic fallback in Light](../screenshots/powershell-acrylic-light.png)
![Controls Tour acrylic fallback in Dark](../screenshots/powershell-acrylic-dark.png)
</details>
