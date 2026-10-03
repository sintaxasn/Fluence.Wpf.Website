param(
    [string]$PackageSource = (Join-Path $PSScriptRoot 'packages'),
    [switch]$Capture,
    [switch]$UpdateLockFile
)

$ErrorActionPreference = 'Stop'
$project = Join-Path $PSScriptRoot 'Fluence.Wpf.Docs.Walkthroughs.csproj'
$sourceDirectory = (Resolve-Path -LiteralPath $PackageSource).Path
$packageFile = Join-Path $sourceDirectory 'Fluence.Wpf.0.9.1.nupkg'
if (-not (Test-Path -LiteralPath $packageFile -PathType Leaf)) {
    throw "Expected Fluence.Wpf.0.9.1.nupkg in $sourceDirectory"
}

$hash = (Get-FileHash -LiteralPath $packageFile -Algorithm SHA256).Hash.ToLowerInvariant()
$cache = Join-Path $PSScriptRoot (Join-Path 'obj' ('packages-' + $hash.Substring(0, 16)))

$config = Join-Path $PSScriptRoot 'NuGet.Config'
New-Item -ItemType Directory -Force -Path $cache | Out-Null
$bundledSource = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot 'packages')).Path
if ([StringComparer]::OrdinalIgnoreCase.Equals($sourceDirectory.TrimEnd('\'), $bundledSource.TrimEnd('\'))) {
    $provenancePath = Join-Path $bundledSource 'PROVENANCE.md'
    $provenance = Get-Content -LiteralPath $provenancePath -Raw
    $recordedHash = [regex]::Match($provenance, '(?m)^- SHA256: ([A-Fa-f0-9]{64})\s*$')
    if (-not $recordedHash.Success -or -not [string]::Equals($hash, $recordedHash.Groups[1].Value, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Bundled package hash does not match $provenancePath. Refresh it with Update-Package.ps1."
    }
}
$restoreConfig = $config
if (-not [StringComparer]::OrdinalIgnoreCase.Equals($sourceDirectory.TrimEnd('\'), $bundledSource.TrimEnd('\'))) {
    $restoreConfig = Join-Path $cache 'NuGet.Config'
    [xml]$restoreConfiguration = Get-Content -LiteralPath $config
    $localSource = @($restoreConfiguration.configuration.packageSources.add) |
        Where-Object { $_.key -eq 'walkthrough-package' } |
        Select-Object -First 1
    $localSource.value = $sourceDirectory
    $restoreConfiguration.Save($restoreConfig)
}

$restoreArgs = @('restore', $project, '--configfile', $restoreConfig, '--packages', $cache, '--use-lock-file')
if ($UpdateLockFile) {
    $restoreArgs += '--force-evaluate'
} else {
    $restoreArgs += '--locked-mode'
}
dotnet @restoreArgs
if ($LASTEXITCODE -ne 0) { throw 'Walkthrough restore failed.' }

if ($UpdateLockFile) {
    $lockPath = Join-Path $PSScriptRoot 'packages.lock.json'
    $lockText = [System.IO.File]::ReadAllText($lockPath).Replace("`r`n", "`n").Replace("`r", "`n").TrimEnd() + "`n"
    [System.IO.File]::WriteAllText($lockPath, $lockText, [System.Text.UTF8Encoding]::new($true))
}

dotnet build $project -c Release --no-restore -m:1 -nr:false -p:RestorePackagesPath=$cache
if ($LASTEXITCODE -ne 0) { throw 'Walkthrough build failed.' }

if ($Capture) {
    dotnet run --project $project -c Release --no-build -- --capture-all
    if ($LASTEXITCODE -ne 0) { throw 'Walkthrough capture failed. Check docs/screenshots/tutorials/capture-error.txt.' }
}
