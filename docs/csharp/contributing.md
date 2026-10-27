# Contributing to the C# library

Read the repository [contribution guide](../../CONTRIBUTING.md) and [developer handbook](../../AGENTS.md) before changing code. They define supported targets, analyzer rules, source formatting, build commands, and verification expectations.

From the repository root, restore and build with `dotnet restore Fluence.Wpf.sln` and `dotnet build Fluence.Wpf.sln -c Debug`. Run the affected test targets using the commands in the contribution guide; UI tests require an interactive Windows desktop.

Useful starting points:

- [Architecture](../explanation/architecture.md) and [theme pipeline](../explanation/theme-pipeline.md)
- [Control catalog](../controls.md) and [API reference](../api/index.md)
- [Known issues](../../KNOWN_ISSUES.md)
- [Running the Gallery](gallery.md) to inspect the visual behavior of a change

The PowerShell module lives alongside the library but has its own [contribution workflow](../powershell/contributing.md), build scripts, and quality gate.
