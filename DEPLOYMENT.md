# Deployment Instructions

## GitHub Setup

1. Go to https://github.com and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "happy-birthday-reel")
4. Make sure to NOT initialize with a README
5. Click "Create repository"

## Connect Local Repository to GitHub

After creating your repository on GitHub, run these commands in your terminal:

```bash
# Add the remote repository (replace with your actual GitHub URL)
git remote add origin https://github.com/your-username/your-repository-name.git

# Push your code to GitHub
git push -u origin main
```

## Deploy to Vercel

1. Go to https://vercel.com and sign in with your GitHub account
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the build settings
5. Click "Deploy"

## Vercel Environment Variables

After deployment, you may need to set environment variables in your Vercel project settings:

- `NODE_ENV` = production

## Troubleshooting

If you encounter any issues:

1. Make sure all your changes are committed:
   ```bash
   git add .
   git commit -m "Update for deployment"
   ```

2. If you get authentication errors, you might need to set up SSH keys or use a personal access token

3. If the deployment fails, check the build logs in Vercel for specific error messages

## Alternative Deployment Method

If you prefer to deploy without Git, you can:

1. Create a zip file of your project
2. Go to Vercel dashboard
3. Click "New Project"
4. Select "Import" and upload your zip file
5. Configure the build settings manually:
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`