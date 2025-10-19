# Happy Birthday Reel

A special birthday surprise website built with React, Vite, and Express.

## Deployment to Vercel

This project is configured for deployment to Vercel. Follow these steps:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Vercel will automatically detect the build settings from `vercel.json`

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Build for Production

```bash
# Build the project
npm run build
```

## Environment Variables

Make sure to set the following environment variables in your Vercel project settings:

- `NODE_ENV` = production

## Project Structure

- `client/` - React frontend application
- `server/` - Express server
- `shared/` - Shared types and utilities

## Deployment Notes

- The project uses `vercel.json` for deployment configuration
- Static files are served from the `dist/public` directory
- API routes are handled by the Express server