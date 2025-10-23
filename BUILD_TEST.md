# Build Test Instructions

## Local Build Test
To test if the client builds correctly locally:

1. Run the following command in the root directory:
   ```
   npm run build
   ```

2. Check that the client/dist directory is populated with built files

3. Verify that client/dist/index.html exists

## Vercel Build Process
The vercel-build script in package.json should run:
```
cd client && npx vite build
```

This should create the necessary files in client/dist for Vercel to serve.

## If Build Fails
If the build fails:

1. Check that all dependencies are installed:
   ```
   npm install
   ```

2. Verify that the Vite configuration is correct in vite.config.ts

3. Check for any TypeScript or JavaScript errors in the client code

4. Ensure that the client/src directory contains all necessary source files