@echo off
REM Todo Application Setup Script for Windows
REM This script sets up and runs both backend and frontend applications

echo.
echo 🚀 Todo Application Setup Script
echo ==================================
echo.

REM Check Java
echo [INFO] Checking Java installation...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed. Please install Java 17 or higher.
    pause
    exit /b 1
)

for /f "tokens=3" %%g in ('java -version 2^>^&1 ^| findstr /i "version"') do (
    set JAVA_VERSION=%%g
)
echo [SUCCESS] Java is installed: %JAVA_VERSION%

REM Check Maven
echo [INFO] Checking Maven installation...
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Maven not found. Will use Maven wrapper.
    set MVN_CMD=mvnw
) else (
    echo [SUCCESS] Maven is installed
    set MVN_CMD=mvn
)

REM Check Node.js
echo [INFO] Checking Node.js installation...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 14 or higher.
    pause
    exit /b 1
)

for /f %%i in ('node -v') do set NODE_VERSION=%%i
echo [SUCCESS] Node.js is installed: %NODE_VERSION%

REM Check npm
echo [INFO] Checking npm installation...
npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed.
    pause
    exit /b 1
)

for /f %%i in ('npm -v') do set NPM_VERSION=%%i
echo [SUCCESS] npm is installed: %NPM_VERSION%

echo.
echo [INFO] All prerequisites are met!
echo.

REM Setup Backend
echo [INFO] Setting up Spring Boot backend...
cd todo-backend

echo [INFO] Building backend application...
%MVN_CMD% clean compile
if %errorlevel% neq 0 (
    echo [ERROR] Backend build failed!
    pause
    exit /b 1
)
echo [SUCCESS] Backend build successful!

cd ..

REM Setup Frontend
echo [INFO] Setting up React frontend...
cd todo-frontend

echo [INFO] Installing frontend dependencies...
npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend dependency installation failed!
    pause
    exit /b 1
)
echo [SUCCESS] Frontend dependencies installed!

cd ..

echo.
echo [SUCCESS] 🎉 Setup completed successfully!
echo.
echo [INFO] To start the applications:
echo.
echo [INFO] 1. Start the backend (in one terminal):
echo    cd todo-backend
echo    %MVN_CMD% spring-boot:run
echo.
echo [INFO] 2. Start the frontend (in another terminal):
echo    cd todo-frontend
echo    npm start
echo.
echo [INFO] 3. Access the application:
echo    Backend API: http://localhost:8080
echo    Frontend App: http://localhost:3000
echo    H2 Console: http://localhost:8080/h2-console
echo.
echo [INFO] Happy coding! 🚀
echo.
pause
