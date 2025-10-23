import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from "http";
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    // Serve static files from client/dist
    app.use(express.static('client/dist'));

    // Handle SPA routing - serve index.html for all non-API routes
    app.get('*', (req, res) => {
        // For API routes, return a 404
        if (req.path.startsWith('/api')) {
            return res.status(404).json({ error: 'API route not found' });
        }
        // For all other routes, serve the SPA index.html
        res.sendFile('index.html', { root: 'client/dist' });
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