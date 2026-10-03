param(
    [Parameter(Mandatory = $true)][string]$PackageFile,
    [Parameter(Mandatory = $true)][string]$SourceCommit,
    [Parameter(Mandatory = $true)][string]$SourceState
)

$ErrorActionPreference = 'Stop'
$source = (Resolve-Path -LiteralPath $PackageFile).Path
if ([System.IO.Path]::GetFileName($source) -ne 'Fluence.Wpf.0.9.1-pre.nupkg') {
    throw 'Expected a Fluence.Wpf.0.9.1-pre.nupkg archive.'
}

$targetDirectory = Join-Path $PSScriptRoot 'packages'
$target = Join-Path $targetDirectory 'Fluence.Wpf.0.9.1-pre.nupkg'
if (-not (Test-Path -LiteralPath $targetDirectory -PathType Container)) {
    $null = New-Item -ItemType Directory -Path $targetDirectory
}

if (-not [string]::Equals($source, $target, [System.StringComparison]::OrdinalIgnoreCase)) {
    Copy-Item -LiteralPath $source -Destination $target -Force
}

$hash = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToUpperInvariant()
$provenance = @"
# Bundled Fluence.Wpf package

- Package: Fluence.Wpf.0.9.1-pre.nupkg
- SHA256: $hash
- Source commit: $SourceCommit
- Source state: $SourceState
- Refresh command: Update-Package.ps1 -PackageFile <path> -SourceCommit <sha> -SourceState <description>

The website sample uses this local package; this file does not imply public NuGet publication.
"@
$encoding = [System.Text.UTF8Encoding]::new($true)
[System.IO.File]::WriteAllText((Join-Path $targetDirectory 'PROVENANCE.md'), ($provenance.TrimEnd() + "`n").Replace("`r`n", "`n"), $encoding)
Write-Output "Updated $target (SHA256 $hash)."
