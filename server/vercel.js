import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Create express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static assets
app.use(express.static(path.join(__dirname, "../client/dist")));

// Error handling middleware
app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(`Error: ${message}`);
    res.status(status).json({ message });
});

// Handle SPA routing - serve index.html for all non-API routes
app.get("*", (req, res) => {
    // For API routes, let Vercel handle them through the api directory
    if (req.path.startsWith("/api")) {
        res.status(404).json({ error: "API route not found" });
    } else {
        // Serve index.html for all other routes (SPA routing)
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    }
});

// For development, we need to create and export an HTTP server
// For Vercel, we just export the app
let server;
if (process.env.NODE_ENV !== "production") {
    server = createServer(app);
}

export default app;
export { server };