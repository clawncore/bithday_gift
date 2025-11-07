import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";

// Load environment variables
dotenv.config();

// Create express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error handling middleware
app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(`Error: ${message}`);
    res.status(status).json({ message });
});

// On Vercel, static files are served directly by Vercel, not by this Express app
// We only need to handle API routes and SPA routing for non-API requests

// Handle SPA routing - serve index.html for all non-API routes
app.get("*", (req, res) => {
    // On Vercel, the index.html is in the client/dist directory relative to the build
    // But only serve index.html for non-API routes
    if (!req.path.startsWith("/api")) {
        res.sendFile("index.html", { root: "./client/dist" });
    } else {
        // For API routes, let Vercel handle them through the api directory
        res.status(404).json({ error: "API route not found" });
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