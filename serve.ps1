# BORA GROUP Robust TCP Web Server
# Serves static files on port 8080 and supports any public host header (bypasses Windows HttpListener 400 Bad Request errors)

$port = 8080
$address = [System.Net.IPAddress]::Any
$listener = New-Object System.Net.Sockets.TcpListener($address, $port)

try {
    $listener.Start()
    Write-Host "=============================================" -ForegroundColor Yellow
    Write-Host "  BORA GROUP TCP WEB SERVER ACTIVE           " -ForegroundColor Yellow
    Write-Host "=============================================" -ForegroundColor Yellow
    Write-Host "Local URL: http://localhost:$port" -ForegroundColor Green
    Write-Host "Compatible with public reverse tunnels (localhost.run, pinggy, etc.)" -ForegroundColor Gray
    Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Yellow
    Write-Host "=============================================" -ForegroundColor Yellow
} catch {
    Write-Host "Failed to start server on port $port. Make sure the port is not already in use." -ForegroundColor Red
    Write-Error $_
    Exit
}

$basePath = Get-Location

while ($listener.Active -or $true) {
    $client = $null
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        
        # Read incoming request bytes
        $buffer = New-Object System.Byte[] 8192
        $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
        if ($bytesRead -gt 0) {
            $requestStr = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead)
            
            # Parse the HTTP GET request
            if ($requestStr -match "^GET\s+([^\s\?#]+)") {
                $rawUrl = $Matches[1]
                
                # Unescape URL characters (like %20 for spaces)
                $decodedUrl = [System.Uri]::UnescapeDataString($rawUrl)
                
                # Route root and subdirectories to index.html
                $cleanUrl = $decodedUrl.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
                $filePath = Join-Path $basePath $cleanUrl
                if (Test-Path $filePath -PathType Container) {
                    $filePath = Join-Path $filePath "index.html"
                }
                
                if (Test-Path $filePath -PathType Leaf) {
                    $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $contentType = switch ($extension) {
                        ".html" { "text/html; charset=utf-8" }
                        ".htm"  { "text/html; charset=utf-8" }
                        ".css"  { "text/css; charset=utf-8" }
                        ".js"   { "application/javascript; charset=utf-8" }
                        ".png"  { "image/png" }
                        ".jpg"  { "image/jpeg" }
                        ".jpeg" { "image/jpeg" }
                        ".gif"  { "image/gif" }
                        ".svg"  { "image/svg+xml" }
                        ".ico"  { "image/x-icon" }
                        ".woff" { "font/woff" }
                        ".woff2" { "font/woff2" }
                        ".ttf"  { "font/ttf" }
                        ".otf"  { "font/otf" }
                        ".json" { "application/json" }
                        default { "application/octet-stream" }
                    }
                    
                    $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
                    
                    # Formulate standard HTTP response headers
                    $headers = "HTTP/1.1 200 OK`r`n" +
                               "Content-Type: $contentType`r`n" +
                               "Content-Length: $($fileBytes.Length)`r`n" +
                               "Cache-Control: no-cache, no-store, must-revalidate`r`n" +
                               "Pragma: no-cache`r`n" +
                               "Expires: 0`r`n" +
                               "Connection: close`r`n`r`n"
                               
                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($headers)
                    
                    # Write headers and file content back to client socket
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($fileBytes, 0, $fileBytes.Length)
                    Write-Host "[200] Serving: $decodedUrl" -ForegroundColor Gray
                } else {
                    $html = "<html><head><title>404 Not Found</title></head><body style='font-family:sans-serif;padding:40px;text-align:center;'><h1>404 Not Found</h1><p>File not found: $decodedUrl</p></body></html>"
                    $htmlBytes = [System.Text.Encoding]::UTF8.GetBytes($html)
                    
                    $headers = "HTTP/1.1 404 Not Found`r`n" +
                               "Content-Type: text/html; charset=utf-8`r`n" +
                               "Content-Length: $($htmlBytes.Length)`r`n" +
                               "Connection: close`r`n`r`n"
                               
                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($headers)
                    
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($htmlBytes, 0, $htmlBytes.Length)
                    Write-Host "[404] Not Found: $decodedUrl" -ForegroundColor Red
                }
            }
        }
    } catch {
        # Catch unexpected socket disconnects gracefully
    } finally {
        if ($client) {
            try { $client.Close() } catch {}
        }
    }
}
