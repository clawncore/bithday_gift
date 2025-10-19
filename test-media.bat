@echo off
echo Birthday Gift - Test Media Changes
echo =================================

echo Building the application...
npm run build
if %errorlevel% neq 0 (
    echo Build failed. Please check the errors above.
    pause
    exit /b %errorlevel%
)

echo.
echo Build completed successfully!

echo.
echo Starting development server...
echo Visit http://localhost:5173/ to view your changes
npm run dev