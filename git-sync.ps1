# git-sync.ps1
# Ensures local is synchronized with GitHub, commits changes with a descriptive message, and pushes.

Write-Host "=== Git Sync & Push Utility ===" -ForegroundColor Cyan

# 1. Check for remote changes (fetch and pull)
Write-Host "Checking for updates from remote..." -ForegroundColor Gray
git fetch origin main
$behind = (git rev-list --count HEAD..origin/main)
if ($behind -gt 0) {
    Write-Host "Local branch is behind origin/main by $behind commit(s). Pulling updates..." -ForegroundColor Yellow
    git pull --rebase origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Pull failed. Please resolve conflicts manually."
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "Successfully pulled remote changes." -ForegroundColor Green
} else {
    Write-Host "Local branch is up-to-date with remote." -ForegroundColor Green
}

# 2. Check for local modifications
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No local changes to commit. Repository is clean." -ForegroundColor Green
    Read-Host "Press Enter to exit"
    exit 0
}

# Display changes
Write-Host "`nLocal changes detected:" -ForegroundColor Yellow
Write-Host $status

# 3. Stage all changes
Write-Host "`nStaging all modified and untracked files..." -ForegroundColor Gray
git add -A

# 4. Generate descriptive commit message
$filesChanged = @()
$status -split "`r?`n" | ForEach-Object {
    if ($_ -match '^\s*[MADRUC? ]+\s+(.+)$') {
        $filesChanged += (Split-Path -Leaf $Matches[1])
    }
}
$filesChanged = $filesChanged | Select-Object -Unique
$defaultMsg = "Update " + ($filesChanged -join ", ")
if ($defaultMsg.Length -gt 60) {
    $defaultMsg = $defaultMsg.Substring(0, 57) + "..."
}

Write-Host "`nSuggested commit message: '$defaultMsg'" -ForegroundColor Gray
$commitMsg = Read-Host "Enter custom commit message (or press Enter to use suggestion)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = $defaultMsg
}

# 5. Commit
Write-Host "`nCommitting changes..." -ForegroundColor Gray
git commit -m $commitMsg
if ($LASTEXITCODE -ne 0) {
    Write-Error "Commit failed."
    Read-Host "Press Enter to exit"
    exit 1
}

# 6. Push to remote
Write-Host "`nPushing changes to GitHub (main branch)..." -ForegroundColor Gray
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Error "Push failed. Make sure you have permission to write to this repository and your credentials are set up."
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n=== Sync Complete! Changes pushed to GitHub. ===" -ForegroundColor Green
Read-Host "Press Enter to exit"
