# BORA GROUP Website Zipper
# Compresses all website files into a single ZIP file for easy drag-and-drop deployment

$currentPath = (Get-Location).Path
$parentDir = Split-Path $currentPath -Parent
$zipPath = Join-Path $parentDir "bora-group-website.zip"

Write-Host "=============================================" -ForegroundColor Yellow
Write-Host "  BORA GROUP WEBSITE ZIPPER                  " -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Yellow
Write-Host "Creating zip file at: $zipPath" -ForegroundColor Gray

try {
    # Remove old zip if it exists
    if (Test-Path $zipPath) {
        Remove-Item $zipPath -Force
    }

    # Compress all contents of the current directory (excluding utility scripts and the output zip)
    Get-ChildItem -Exclude "zip-website.ps1", "serve.ps1", "tunnel.ps1" | Compress-Archive -DestinationPath $zipPath -Force
    
    Write-Host "Success! ZIP file created successfully." -ForegroundColor Green
    Write-Host "You can find it at: $zipPath" -ForegroundColor White
    Write-Host "=============================================" -ForegroundColor Yellow
} catch {
    Write-Host "Failed to create ZIP archive." -ForegroundColor Red
    Write-Error $_
}
