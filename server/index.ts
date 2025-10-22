import dotenv from 'dotenv';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { exec } from 'child_process';
import os from 'os';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    log(`Error: ${message}`, "server");
    res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

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