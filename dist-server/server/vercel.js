"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
// Load environment variables
dotenv_1.default.config();
// Create express app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Register API routes first
(0, routes_1.registerRoutes)(app).catch(error => {
    console.error(`Error registering routes: ${error.message}`);
});
// Error handling middleware
app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(`Error: ${message}`);
    res.status(status).json({ message });
});
// Serve static files in production - this should come AFTER API routes
if (process.env.NODE_ENV === "production") {
    // Serve static files from dist (root directory)
    app.use(express_1.default.static("dist"));
    // Handle SPA routing - serve index.html for all non-API routes
    app.get("*", (req, res) => {
        if (!req.path.startsWith("/api")) {
            res.sendFile("index.html", { root: "dist" });
        }
        else {
            res.status(404).json({ error: "API route not found" });
        }
    });
}
// For development, we need to create and export an HTTP server
// For Vercel, we just export the app
let server;
if (process.env.NODE_ENV !== "production") {
    exports.server = server = (0, http_1.createServer)(app);
}
exports.default = app;
