# Accessibility

Fluence.Wpf controls follow WPF keyboard, focus, and UI Automation patterns where their base control supplies them. Custom controls add peers in `Fluence.Wpf.Automation` for their own behavior. The gallery's Accessibility page exercises focus order, high contrast, automation, and right-to-left layout.

## Provide names and keyboard paths

Give icon-only and otherwise unlabeled controls an accessible name with `AutomationProperties.Name`. Keep a logical Tab order and an operable keyboard path for custom content inside `FluenceWindow.TitleBar`, `NavigationView`, dialogs, and flyouts. The default templates use Fluence focus resources; application templates should use the published focus roles too.

## Check custom controls

The source contains automation peers for controls including `NavigationView`, `NavigationViewItem`, `ToggleSwitch`, `SplitButton`, `ToggleSplitButton`, `DropDownButton`, `NumberBox`, `RatingControl`, `ProgressRing`, `InfoBar`, `ContentDialog`, `TeachingTip`, `DatePicker`, and `TimePicker`. Inspect each peer and its XML comments when you need an exact provider or pattern contract. The [automation peer tests](../../Fluence.Wpf.Tests/Control/Rules/AutomationPeerTests.cs) and [accessible name tests](../../Fluence.Wpf.Tests/Control/Rules/AccessibilityNameTests.cs) are executable checks.

## Test appearance as well as events

Apply Light, Dark, and High Contrast and check that text, status, focus, and selection stay visible. The theme engine republishes high contrast brushes from Windows system colors. Check reduced motion behavior for animated custom content and verify it with a screen reader and keyboard on the Windows versions you support. The [gallery](../../Fluence.Wpf.Demo/README.md) provides a visual starting point.
