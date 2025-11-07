import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    base: "/", // Use absolute paths for proper server serving
    publicDir: "public", // Simplified public directory reference
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@shared": path.resolve(__dirname, "..", "shared"),
            "@assets": path.resolve(__dirname, "..", "attached_assets"),
        },
    },
    server: {
        fs: {
            strict: true,
            deny: ["**/.*"],
        },
    },
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name) {
                        // For files in public directory, keep original name
                        if (assetInfo.name.includes('background')) {
                            return assetInfo.name;
                        }
                        let extType = assetInfo.name.split('.').at(1);
                        if (extType && /png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                            extType = 'img';
                        }
                        return `assets/${assetInfo.name}`;
                    }
                    return `assets/[name]-[hash][extname]`;
                },
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
            },
        },
        assetsDir: 'assets',
        assetsInlineLimit: 0, // Disable inlining assets to ensure they're properly served
    },
    css: {
        devSourcemap: true,
    },
});