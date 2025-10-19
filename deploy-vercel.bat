@echo off
echo Birthday Gift Project - Deployment to Vercel via GitHub
echo ======================================================

echo Adding all changes...
git add .

set /p commitMessage=Enter commit message (or press Enter for default message): 
if "%commitMessage%"=="" set commitMessage=Update birthday gift project

echo Committing changes...
git commit -m "%commitMessage%"

echo Pushing to GitHub (this will trigger a new Vercel deployment)...
git push origin main

echo.
echo Deployment initiated! 
echo Vercel will automatically deploy your changes.
echo Check your Vercel dashboard for deployment status.
echo.
pause