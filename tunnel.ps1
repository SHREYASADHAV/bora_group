# BORA GROUP Public Tunnel Exposer
# Connects your local server (running on port 8080) to the public internet using secure SSH tunneling

Write-Host "=============================================" -ForegroundColor Yellow
Write-Host "  BORA GROUP PUBLIC TUNNEL INTERFACE        " -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Yellow
Write-Host "This script will generate a secure public link that works anywhere in the world." -ForegroundColor Gray
Write-Host "Choose one of the tunnel methods below by copying the command into a new PowerShell window:" -ForegroundColor Yellow
Write-Host ""
Write-Host "OPTION A: localhost.run (Very simple public URL)" -ForegroundColor Cyan
Write-Host "Command: ssh -R 80:localhost:8080 nokey@localhost.run" -ForegroundColor White
Write-Host ""
Write-Host "OPTION B: Pinggy (Generates a QR Code for scanning on your mobile phone!)" -ForegroundColor Cyan
Write-Host "Command: ssh -p 443 -R 0:localhost:8080 qr@a.pinggy.io" -ForegroundColor White
Write-Host ""
Write-Host "=============================================" -ForegroundColor Yellow
Write-Host "Starting default tunnel using OPTION A (localhost.run)..." -ForegroundColor Green
Write-Host "Keep this window open. Press Ctrl+C to close the tunnel and disable the link." -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Yellow
Write-Host ""

ssh -R 80:localhost:8080 nokey@localhost.run
