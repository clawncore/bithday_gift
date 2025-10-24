"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config();
// Simple logging function
function log(message, type = "info") {
    console.log(`[${new Date().toISOString()}] ${type.toUpperCase()}: ${message}`);
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Serve static files BEFORE registering routes
// This is crucial for the root route to work
app.use(express_1.default.static("client/public"));
app.use(express_1.default.static("client/dist"));
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse = undefined;
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
                logLine = logLine.slice(0, 79) + "";
            }
            log(logLine);
        }
    });
    next();
});
// Handle SPA routing - serve index.html for all non-API routes
// This needs to be registered AFTER static files but BEFORE API routes
app.get("*", (req, res, next) => {
    // If requesting favicon, serve it directly
    if (req.path === "/favicon.ico") {
        const faviconPath = "client/public/favicon.ico";
        res.sendFile(path_1.default.resolve(faviconPath), (err) => {
            if (err) {
                // If favicon doesn't exist, send a minimal response
                res.status(204).end();
            }
        });
        return;
    }
    // Let static files be served first, then handle SPA routing
    if (!req.path.startsWith("/api")) {
        res.sendFile(path_1.default.resolve("client/dist/index.html"));
    }
    else {
        // Pass API routes to the next handler
        next();
    }
});
(async () => {
    const server = await (0, routes_1.registerRoutes)(app);
    app.use((err, _req, res, _next) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        log(`Error: ${message}`, "server");
        res.status(status).json({ message });
    });
    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || "5000", 10);
    server.listen(port, "0.0.0.0", () => {
        log(`serving on port ${port}`);
        // Open browser in development mode only
        if (app.get("env") === "development") {
            const url = `http://localhost:${port}`;
            try {
                if (os_1.default.platform() === "win32") {
                    (0, child_process_1.exec)(`start ${url}`, (error) => {
                        if (error) {
                            log(`Failed to open browser: ${error.message}`);
                        }
                    });
                }
                else if (os_1.default.platform() === "darwin") {
                    (0, child_process_1.exec)(`open ${url}`, (error) => {
                        if (error) {
                            log(`Failed to open browser: ${error.message}`);
                        }
                    });
                }
                else {
                    (0, child_process_1.exec)(`xdg-open ${url}`, (error) => {
                        if (error) {
                            log(`Failed to open browser: ${error.message}`);
                        }
                    });
                }
            }
            catch (error) {
                log(`Failed to open browser: ${error.message}`);
            }
        }
    });
})();
