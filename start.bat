@echo off
cd /d "%~dp0"
if not exist "server\.env" (
 echo server\.env not found. Copy server\.env.example to server\.env first.
 pause
 exit /b 1
)
start "CareerHub Backend" cmd /k "npm run dev --prefix server"
timeout /t 2 /nobreak >nul
start "CareerHub Frontend" cmd /k "npm run dev --prefix client"
echo CareerHub Frontend: http://localhost:5173
echo CareerHub API: http://localhost:5000/api/health
pause
