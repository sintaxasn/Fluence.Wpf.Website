# Security policy

The Fluence.Wpf website is a static Docusaurus site published at [fluencewpf.com](https://fluencewpf.com) through Cloudflare Workers. This policy covers this repository and the published site.

## Scope

This policy covers:

- The site source in `website/`, including the Docusaurus configuration, theme overrides, and build plugins.
- The production site at [fluencewpf.com](https://fluencewpf.com) and its Worker settings in `website/wrangler.jsonc`.
- The GitHub Actions workflows in `.github/workflows/`.
- The walkthrough sample in `samples/Fluence.Wpf.Docs.Walkthroughs/` and its local package source.
- Documentation that would lead a reader to an unsafe configuration or code pattern.

Report these elsewhere:

- The Fluence.Wpf library and PowerShell module: follow the [Fluence.Wpf security policy](https://github.com/sintaxasn/Fluence.Wpf/blob/main/SECURITY.md). The C# API reference, PowerShell command reference, control catalog, theming guide, and WinUI parity guide are maintained in that repository and synced here. If you are unsure which repository applies, report here.
- The Cloudflare, GitHub, and Google Analytics platforms: report to those vendors.

## Supported versions

Security fixes are made on the `main` branch, which deploys the production site. Preview deployments for other branches and older release branches do not receive separate fixes.

## Report a vulnerability

Use GitHub's private vulnerability reporting from this repository's **Security** tab, or email [security@fluencewpf.com](mailto:security@fluencewpf.com). Do not include exploit details or secrets in public issues.

Include the affected URL or file, the commit or deployment, a minimal reproduction, expected and observed behavior, and the impact. For a client-side issue, include the browser and its version. For a workflow issue, include the workflow file and a link to the run.

Test against a local build or your own fork where possible. Do not run denial-of-service, load, or high-volume automated scans against fluencewpf.com.

Broken links, typos, and layout problems belong in [GitHub issues](https://github.com/sintaxasn/Fluence.Wpf.Website/issues).
