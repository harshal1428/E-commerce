@echo off
echo Installing MongoDB Community Server...
echo.

REM Download MongoDB
curl -L -o mongodb-windows-x86_64-7.0.5.msi "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.5.msi"

echo Installing MongoDB...
msiexec /i mongodb-windows-x86_64-7.0.5.msi /quiet /norestart

echo Adding MongoDB to PATH...
setx PATH "%PATH%;C:\Program Files\MongoDB\Server\7.0\bin" /M

echo Creating MongoDB data directory...
mkdir C:\data\db 2>nul

echo Starting MongoDB service...
net start MongoDB

echo MongoDB installation completed!
echo.
pause
