import express from 'express';
import { registerRoutes } from "./routes";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Simple logging function
function log(message: string, type: string = "info") {
  console.log(`[${new Date().toISOString()}] ${type.toUpperCase()}: ${message}`);
}

// Create express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
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

// Register routes
registerRoutes(app).catch(error => {
  log(`Error registering routes: ${error.message}`, "error");
});

// Error handling middleware
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  log(`Error: ${message}`, "server");
  res.status(status).json({ message });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from client/dist
  app.use(express.static('client/dist'));
  
  // Handle SPA routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile('client/dist/index.html', { root: '.' });
    } else {
      res.status(404).json({ error: 'API route not found' });
    }
  });
}

export default app;