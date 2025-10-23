// Simple API endpoint for replying to the gift - Vercel compatible version
// Avoiding complex imports that might cause issues in serverless environment
export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
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

        // For now, just log the reply and return success
        // In a real implementation, you would save this to a database
        console.log('Reply received:', { choice, message });

        return response.status(200).json({ ok: true });
    } catch (error) {
        console.error("Error processing reply:", error);
        return response.status(500).json({ 
            error: "Failed to process reply",
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
        });
    }
}