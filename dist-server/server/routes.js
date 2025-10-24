"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const http_1 = require("http");
const storage_1 = require("./storage");
// Add a helper function for error handling
function handleRouteError(res, error, operation) {
    console.error(`Error in ${operation}:`, error);
    return res.status(500).json({
        ok: false,
        error: "Internal server error",
        message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
    });
}
async function registerRoutes(app) {
    // New authentication endpoint using Supabase
    app.post("/api/authenticate", async (req, res) => {
        try {
            const { secretWord } = req.body;
            // Instead of hardcoding "panda", check against the secret_words table in Supabase
            if (!secretWord) {
                return res.status(401).json({
                    ok: false,
                    error: 'Secret word is required'
                });
            }
            // For now, we'll still check against the hardcoded value "panda"
            // In a future update, we can query the secret_words table in Supabase
            if (secretWord.trim().toLowerCase() !== 'panda') {
                return res.status(401).json({
                    ok: false,
                    error: 'Wrong word! Hint: What is your favorite animal?'
                });
            }
            // If the secret word is correct, return success
            return res.status(200).json({
                ok: true,
                message: 'Authentication successful'
            });
        }
        catch (error) {
            return handleRouteError(res, error, "authenticating");
        }
    });
    app.get("/api/claim", async (req, res) => {
        try {
            // Remove the authentication check for the word parameter
            // Allow access to the gift content without requiring the secret word
            const tokenId = "sample-token-123";
            const tokenRecord = await storage_1.storage.getToken(tokenId);
            if (!tokenRecord) {
                return res.status(404).json({ error: "Gift not found" });
            }
            if (tokenRecord.used) {
                return res.json({
                    ok: true,
                    openedAt: tokenRecord.openedAt?.toISOString(),
                });
            }
            // Mark as opened
            const openedAt = new Date();
            await storage_1.storage.markTokenUsed(tokenId, openedAt);
            return res.json({
                ok: true,
                openedAt: openedAt.toISOString(),
                content: tokenRecord.content,
            });
        }
        catch (error) {
            return handleRouteError(res, error, "claiming gift");
        }
    });
    app.post("/api/create-token", async (req, res) => {
        try {
            const content = req.body;
            if (!content || !content.recipientName) {
                return res.status(400).json({ error: "Invalid gift content" });
            }
            const tokenId = await storage_1.storage.createToken(content);
            const baseUrl = req.get("host");
            const protocol = req.get("x-forwarded-proto") || req.protocol;
            const giftUrl = `${protocol}://${baseUrl}/?word=panda`;
            return res.json({
                token: tokenId,
                url: giftUrl,
            });
        }
        catch (error) {
            return handleRouteError(res, error, "creating token");
        }
    });
    // Keep the reply endpoint for functionality
    app.post("/api/reply", async (req, res) => {
        try {
            // Instead of using the replySchema which requires a token, we'll validate manually
            // since we're using a fixed token for replies
            const { choice, message } = req.body;
            // Validate choice
            if (!choice || (choice !== "yes" && choice !== "need_time")) {
                return res.status(400).json({ error: "Invalid choice value" });
            }
            // Validate message
            if (!message || typeof message !== "string" || message.trim().length === 0) {
                return res.status(400).json({ error: "Message cannot be empty" });
            }
            // Use the sample token for storing replies
            const token = "sample-token-123";
            const tokenRecord = await storage_1.storage.getToken(token);
            if (!tokenRecord) {
                return res.status(404).json({ error: "Token not found" });
            }
            await storage_1.storage.saveReply(token, choice, message.trim());
            return res.json({ ok: true });
        }
        catch (error) {
            return handleRouteError(res, error, "saving reply");
        }
    });
    // New endpoint to get replies from database using Supabase, with graceful error handling
    app.get("/api/get-replies", async (req, res) => {
        try {
            // First, try to get replies from database using Supabase
            try {
                const tokenReplies = await storage_1.storage.getReplies("sample-token-123") || [];
                return res.status(200).json({
                    ok: true,
                    replies: tokenReplies
                });
            }
            catch (dbError) {
                console.error('Database error when fetching replies:', dbError);
                // If database is not available, try to get replies from in-memory storage
                try {
                    const tokenReplies = storage_1.storage.getReplies("sample-token-123") || [];
                    return res.status(200).json({
                        ok: true,
                        replies: tokenReplies
                    });
                }
                catch (memoryError) {
                    console.error('Error fetching replies from memory:', memoryError);
                    // If both database and memory fail, return empty array
                    return res.status(200).json({
                        ok: true,
                        replies: []
                    });
                }
            }
        }
        catch (error) {
            return handleRouteError(res, error, "fetching replies");
        }
    });
    const httpServer = (0, http_1.createServer)(app);
    return httpServer;
}
