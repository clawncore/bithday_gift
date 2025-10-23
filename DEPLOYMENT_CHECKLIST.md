# Deployment Checklist

## Server Files
- [x] vercel.js - Entry point for Vercel deployment
- [x] routes.js - API route definitions
- [x] storage.js - Data storage implementation
- [x] prismaClient.js - Prisma database client
- [x] supabaseClient.js - Supabase integration client

## Configuration Files
- [x] vercel.json - Updated to use JavaScript files
  - Uses server/vercel.js as entry point
  - Includes all server JavaScript files
  - Proper route mapping for API and static files

## Package.json Updates
- [x] build:server script updated to avoid confusion
- [x] vercel-build script remains unchanged (builds client only)

## Removed Files
- [x] build-server.ts - No longer needed
- [x] All TypeScript server files - Replaced with JavaScript versions

## Environment Variables
- [ ] Ensure all required environment variables are set in Vercel:
  - SUPABASE_URL
  - SUPABASE_SERVICE_ROLE_KEY
  - TWILIO_ACCOUNT_SID
  - TWILIO_AUTH_TOKEN
  - TWILIO_PHONE_NUMBER

## Testing Steps
Before deploying to production:
1. [ ] Verify local development still works with `npm run dev`
2. [ ] Test API endpoints locally
3. [ ] Check that authentication works with secret word "panda"
4. [ ] Verify reply functionality
5. [ ] Test timeline image display
6. [ ] Check that all UI elements render correctly

## Deployment Verification
After deploying to Vercel:
1. [ ] Homepage loads without 500 errors
2. [ ] API endpoints respond correctly
3. [ ] Authentication works with secret word "panda"
4. [ ] Reply functionality saves messages
5. [ ] Timeline displays all images properly
6. [ ] No module not found errors in Vercel logs

## Rollback Plan
If issues occur after deployment:
1. [ ] Revert to previous working commit
2. [ ] Restore vercel.json to previous configuration
3. [ ] Re-add build-server.ts if needed
4. [ ] Contact Vercel support if module resolution issues persist