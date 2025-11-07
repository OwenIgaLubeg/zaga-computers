@echo off
echo ═══════════════════════════════════════════════════════════════════════════════
echo                    ZAGA TECHNOLOGIES LOCAL SERVER
echo ═══════════════════════════════════════════════════════════════════════════════
echo.
echo Starting local web server...
echo.
echo ⚠️  DO NOT CLOSE THIS WINDOW while testing the website
echo.
echo Once started, your browser will open automatically
echo.
echo Server will run at: http://localhost:8000
echo.
echo ═══════════════════════════════════════════════════════════════════════════════
echo.

REM Try Python 3 first
where python >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo ✓ Python found! Starting server...
    echo.
    start http://localhost:8000
    python -m http.server 8000
    goto :end
)

REM Try Node.js http-server
where http-server >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo ✓ http-server found! Starting server...
    echo.
    start http://localhost:8000
    http-server -p 8000
    goto :end
)

REM Try npx http-server (if npm is available)
where npx >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo ✓ Node.js found! Installing and starting server...
    echo.
    start http://localhost:8000
    npx http-server -p 8000
    goto :end
)

echo.
echo ═══════════════════════════════════════════════════════════════════════════════
echo ❌ ERROR: No web server found!
echo ═══════════════════════════════════════════════════════════════════════════════
echo.
echo You need to install one of the following:
echo.
echo Option 1: Python (Easiest)
echo   Download from: https://www.python.org/downloads/
echo   ✓ Check "Add Python to PATH" during installation
echo.
echo Option 2: Node.js
echo   Download from: https://nodejs.org/
echo   Then run: npm install -g http-server
echo.
echo Option 3: VS Code Live Server Extension
echo   1. Install VS Code
echo   2. Install "Live Server" extension
echo   3. Right-click index.html → "Open with Live Server"
echo.
echo ═══════════════════════════════════════════════════════════════════════════════
echo.
pause
goto :eof

:end
echo.
echo ═══════════════════════════════════════════════════════════════════════════════
echo Server stopped. You can close this window now.
echo ═══════════════════════════════════════════════════════════════════════════════
pause

