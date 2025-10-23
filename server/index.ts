import dotenv from 'dotenv';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { exec } from 'child_process';
import os from 'os';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Simple logging function
function log(message: string, type: string = "info") {
  console.log(`[${new Date().toISOString()}] ${type.toUpperCase()}: ${message}`);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files BEFORE registering routes
// This is crucial for the root route to work
app.use(express.static('client/public'));
app.use(express.static('client/dist'));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Handle SPA routing - serve index.html for all non-API routes
// This needs to be registered AFTER static files but BEFORE API routes
app.get('*', (req, res, next) => {
  // If requesting favicon, serve it directly
  if (req.path === '/favicon.ico') {
    const faviconPath = 'client/public/favicon.ico';
    res.sendFile(path.resolve(faviconPath), (err) => {
      if (err) {
        // If favicon doesn't exist, send a minimal response
        res.status(204).end();
      }
    });
    return;
  }

  // Let static files be served first, then handle SPA routing
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.resolve('client/dist/index.html'));
  } else {
    // Pass API routes to the next handler
    next();
  }
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    log(`Error: ${message}`, "server");
    res.status(status).json({ message });
  });

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5005', 10);
  server.listen(port, '0.0.0.0', () => {
    log(`serving on port ${port}`);
    // Open browser in development mode only
    if (app.get("env") === "development") {
      const url = `http://localhost:${port}`;

      try {
        if (os.platform() === 'win32') {
          exec(`start ${url}`, (error) => {
            if (error) {
              log(`Failed to open browser: ${error.message}`);
            }
          });
        } else if (os.platform() === 'darwin') {
          exec(`open ${url}`, (error) => {
            if (error) {
              log(`Failed to open browser: ${error.message}`);
            }
          });
        } else {
          exec(`xdg-open ${url}`, (error) => {
            if (error) {
              log(`Failed to open browser: ${error.message}`);
            }
          });
        }
      } catch (error: any) {
        log(`Failed to open browser: ${error.message}`);
      }
    }
  });
})();