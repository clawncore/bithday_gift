import { storage } from '../server/storage';

// API endpoint for replying to the gift - Vercel compatible version
export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    // For Vercel serverless functions, the body is already parsed
    let body = request.body || {};

    // If body is a string, parse it as JSON
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (e) {
            return response.status(400).json({ error: 'Invalid JSON in request body' });
        }
    }

    const { choice, message } = body;

    // Validate choice
    if (!choice || (choice !== "yes" && choice !== "need_time")) {
        return response.status(400).json({ error: "Invalid choice value" });
    }

    // Validate message
    if (!message || typeof message !== "string" || message.trim().length === 0) {
        return response.status(400).json({ error: "Message cannot be empty" });
    }

    try {
        // Use the sample token for storing replies
        const token = "sample-token-123";
        
        // Save reply to storage
        await storage.saveReply(token, choice, message.trim());

        // Send success response
        return response.status(200).json({ ok: true });
    } catch (error) {
        console.error("Error saving reply:", error);
        return response.status(500).json({ 
            error: "Failed to save reply",
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
        });
    }
}