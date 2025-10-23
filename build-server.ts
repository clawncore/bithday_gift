import { build } from 'esbuild';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Get all .ts files in the server directory
function getServerFiles(dir: string, files: string[] = []): string[] {
    const entries = readdirSync(dir);
    for (const entry of entries) {
        const fullPath = join(dir, entry);
        if (statSync(fullPath).isDirectory()) {
            getServerFiles(fullPath, files);
        } else if (entry.endsWith('.ts')) {
            files.push(fullPath);
        }
    }
    return files;
}

// Build all server files
async function buildServer() {
    try {
        const serverFiles = getServerFiles('./server');
        
        // Build each file
        for (const file of serverFiles) {
            await build({
                entryPoints: [file],
                outdir: 'dist/server',
                platform: 'node',
                format: 'esm',
                bundle: true,
                sourcemap: true,
                minify: false,
                external: [
                    'express',
                    'cors',
                    'http',
                    'path',
                    'fs',
                    'dotenv',
                    '@prisma/client',
                    '@supabase/supabase-js',
                    'twilio',
                    'pg',
                    'drizzle-orm',
                    'zod'
                ]
            });
            console.log(`Built ${file}`);
        }
        
        console.log('Server build completed successfully!');
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

buildServer();