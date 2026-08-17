@echo off
echo =========================================================
echo    PM MATCH - Production Build Preview
echo =========================================================
echo.
echo Building latest production assets...
call npm run build
echo.
echo Starting preview server at: http://localhost:4173
start http://localhost:4173
npm run preview
pause
