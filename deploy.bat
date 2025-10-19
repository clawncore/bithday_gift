@echo off
echo Birthday Gift Project - Deployment Script
echo ======================================

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
echo To deploy to Vercel:
echo 1. Make sure you have the Vercel CLI installed (npm install -g vercel)
echo 2. Run: vercel --prod
echo.
echo Or push to GitHub to trigger automatic deployment:
echo git add .
echo git commit -m "Deploy updated birthday gift"
echo git push origin main
echo.
pause