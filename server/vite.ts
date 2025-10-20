import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: {
      host: 'localhost',
      port: 5173
    },
    allowedHosts: true as const,
  };

  // Make sure the root directory is set correctly
  const clientRoot = path.resolve(import.meta.dirname, "..", "client");

  const vite = await createViteServer({
    ...viteConfig,
    root: clientRoot, // Set the root directory explicitly
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        clientRoot,
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Correct path for Vercel deployment - look for built files in the correct location
  const distPath = path.resolve(import.meta.dirname, "..", "client", "dist");

  // Fallback to dist directory at root level for Vercel
  const rootDistPath = path.resolve(import.meta.dirname, "..", "dist", "client");

  let servePath;
  if (fs.existsSync(distPath)) {
    servePath = distPath;
  } else if (fs.existsSync(rootDistPath)) {
    servePath = rootDistPath;
  } else {
    // For Vercel, the static files will be in dist/client after build
    servePath = path.resolve(import.meta.dirname, "..", "dist", "client");
    log(`Warning: Could not find build directory, will attempt to serve from ${servePath}`, "server");
  }

  app.use(express.static(servePath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(servePath, "index.html"));
  });
}