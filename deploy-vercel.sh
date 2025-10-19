#!/bin/bash

echo "Birthday Gift Project - Deployment to Vercel via GitHub"
echo "======================================================"

echo "Adding all changes..."
git add .

read -p "Enter commit message (or press Enter for default message): " commitMessage
if [ -z "$commitMessage" ]; then
    commitMessage="Update birthday gift project"
fi

echo "Committing changes..."
git commit -m "$commitMessage"

echo "Pushing to GitHub (this will trigger a new Vercel deployment)..."
git push origin main

echo ""
echo "Deployment initiated!"
echo "Vercel will automatically deploy your changes."
echo "Check your Vercel dashboard for deployment status."