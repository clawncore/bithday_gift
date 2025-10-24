import express from "express";
import dotenv from "dotenv";
import { registerRoutes } from "./routes";
import cors from "cors";
import { createServer } from "http";

// Load environment variables
dotenv.config();

// Create express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes first
registerRoutes(app).catch(error => {
    console.error(`Error registering routes: ${error.message}`);
});

// Error handling middleware
app.use((err: any, _req: any, res: any, _next: any) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(`Error: ${message}`);
    res.status(status).json({ message });
});

// Serve static files in production - this should come AFTER API routes
if (process.env.NODE_ENV === "production") {
    // Serve static files from dist (root directory)
    app.use(express.static("dist"));

    // Handle SPA routing - serve index.html for all non-API routes
    app.get("*", (req, res) => {
        if (!req.path.startsWith("/api")) {
            res.sendFile("index.html", { root: "dist" });
        } else {
            res.status(404).json({ error: "API route not found" });
        }
    });
}

// For development, we need to create and export an HTTP server
// For Vercel, we just export the app
let server: any;
if (process.env.NODE_ENV !== "production") {
    server = createServer(app);
}

export default app;
export { server };