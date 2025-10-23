import { storage } from '../server/storage';

// API endpoint to get replies - Vercel compatible version
export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get replies from storage
        const tokenReplies = await storage.getReplies("sample-token-123") || [];

        return response.status(200).json({
            ok: true,
            replies: tokenReplies
        });
    } catch (error) {
        console.error("Error fetching replies:", error);
        return response.status(500).json({ 
            ok: false,
            error: "Failed to fetch replies",
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
        });
    }
}