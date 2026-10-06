@echo off
cd /d "%~dp0"
echo Installing CareerHub dependencies...
call npm install
if errorlevel 1 goto fail
call npm run install:all
if errorlevel 1 goto fail
echo.
echo Installation complete.
echo Copy server\.env.example to server\.env, configure MongoDB, then run start.bat.
pause
exit /b 0
:fail
echo Installation failed. Review the npm error above.
pause
exit /b 1
