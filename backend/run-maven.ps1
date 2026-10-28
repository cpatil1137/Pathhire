# Maven Wrapper PowerShell Script
$ErrorActionPreference = "Stop"

# Set the script directory
$scriptDir = $PSScriptRoot

# Read maven-wrapper.properties
$properties = Get-Content "$scriptDir\.mvn\wrapper\maven-wrapper.properties" | ConvertFrom-StringData
$distributionUrl = $properties.distributionUrl

# Calculate Maven home
$distributionUrlName = $distributionUrl -replace '^.*/',''
$distributionUrlNameMain = $distributionUrlName -replace '\.[^.]*$','' -replace '-bin$',''
$MAVEN_HOME_PARENT = "$HOME\.m2\wrapper\dists\$distributionUrlNameMain"
$MAVEN_HOME_NAME = ([System.Security.Cryptography.MD5]::Create().ComputeHash([byte[]][char[]]$distributionUrl) | ForEach-Object {$_.ToString("x2")}) -join ''
$MAVEN_HOME = "$MAVEN_HOME_PARENT\$MAVEN_HOME_NAME"

# Check if Maven is already downloaded
if (Test-Path "$MAVEN_HOME\bin\mvn.cmd") {
    Write-Host "Using Maven from: $MAVEN_HOME"
    & "$MAVEN_HOME\bin\mvn.cmd" $args
    exit $LASTEXITCODE
}

# Download Maven if not exists
Write-Host "Downloading Maven from: $distributionUrl"
New-Item -ItemType Directory -Path $MAVEN_HOME_PARENT -Force | Out-Null
$tempFile = "$env:TEMP\maven-download.zip"

$webclient = New-Object System.Net.WebClient
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$webclient.DownloadFile($distributionUrl, $tempFile)

Write-Host "Extracting Maven..."
Expand-Archive $tempFile -DestinationPath $env:TEMP -Force
Move-Item "$env:TEMP\$distributionUrlNameMain" "$MAVEN_HOME" -Force
Remove-Item $tempFile

Write-Host "Maven installed successfully!"
& "$MAVEN_HOME\bin\mvn.cmd" $args
exit $LASTEXITCODE
