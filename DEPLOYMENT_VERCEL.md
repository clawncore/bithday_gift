# Vercel Deployment Guide for Birthday Gift Project

## Prerequisites
1. A Vercel account (free at [vercel.com](https://vercel.com))
2. Your project uploaded to a GitHub repository

## Deployment Steps

### Step 1: Connect Vercel to GitHub
1. Visit [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." and select "Project"
3. Click "Continue with GitHub" to connect your GitHub account
4. Install the Vercel GitHub app if prompted

### Step 2: Import Your Repository
1. In the "Import Git Repository" section, find your `bithday_gift` repository
2. Click "Import" next to your repository

### Step 3: Configure Project Settings
Vercel should automatically detect the settings for your project, but confirm these values:
- Framework Preset: Other
- Root Directory: . (current directory)
- Build Command: `npm run build`
- Output Directory: `dist`

### Step 4: Deploy
1. Click "Deploy"
2. Wait for the build process to complete (usually takes 1-2 minutes)
3. Once deployed, you'll receive a unique URL for your birthday gift site

## Updating Your Site
After the initial deployment, Vercel will automatically redeploy your site whenever you push changes to your GitHub repository:

```bash
# Make your changes locally
git add .
git commit -m "Update description"
git push origin main
```

Vercel will automatically detect the changes and rebuild your site.

## Troubleshooting

### Large File Warning
GitHub warned about a large MP3 file (>50MB). This won't prevent deployment to Vercel but consider:
1. Compressing the audio file
2. Using an external hosting service for large media files
3. Using Git LFS for large files (advanced)

### Build Issues
If you encounter build issues:
1. Check that all dependencies are in package.json
2. Ensure the build command in package.json is correct
3. Verify that the vercel.json configuration is properly set up

## Local Development Commands
To run locally:
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```