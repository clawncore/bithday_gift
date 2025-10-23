# Deployment Checklist for Vercel

## Pre-deployment Checks

### 1. API Endpoints
- [x] All API endpoints in the [api](file:///c:/xampp/htdocs/src/HappyBirthdayReel/api) directory are simplified and self-contained
- [x] No complex imports that might cause serverless function crashes
- [x] Proper error handling with try/catch blocks
- [x] Consistent response structures and status codes

### 2. Environment Variables
- [x] Check that all required environment variables are set in Vercel
- [x] SUPABASE_URL
- [x] SUPABASE_SERVICE_ROLE_KEY
- [x] VITE_SUPABASE_URL
- [x] VITE_SUPABASE_ANON_KEY
- [x] TWILIO_ACCOUNT_SID
- [x] TWILIO_AUTH_TOKEN
- [x] TWILIO_PHONE_NUMBER

### 3. Media Files
- [x] All media files are in the correct location ([client/public/memories](file:///c:/xampp/htdocs/src/HappyBirthdayReel/client/public/memories))
- [x] Media file paths in the claim endpoint match actual files
- [x] File names are correctly referenced

### 4. Client-side Configuration
- [x] API calls use the correct base URL for production
- [x] [getApiBaseUrl()](file:///c:/xampp/htdocs/src/HappyBirthdayReel/client/src/lib/utils.ts#L12-L18) function returns `window.location.origin` in production
- [x] All API endpoints are correctly referenced

## Deployment Steps

1. Commit all changes to the repository
2. Push to GitHub to trigger Vercel deployment
3. Monitor the build logs for any errors
4. Check the Vercel function logs for runtime errors
5. Test all API endpoints after deployment

## Post-deployment Testing

1. Visit the deployed URL
2. Test authentication with secret word "panda"
3. Submit a reply through the form
4. Verify that replies are processed without errors
5. Check that gift content is displayed correctly
6. Verify that all media files load properly

## Troubleshooting

If you encounter any issues:

1. Check Vercel logs for specific error messages
2. Verify that all environment variables are correctly set
3. Ensure that the [api](file:///c:/xampp/htdocs/src/HappyBirthdayReel/api) directory functions are not importing complex modules
4. Check that media files are in the correct location
5. Verify that client-side API calls are using the correct URLs