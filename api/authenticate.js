// API endpoint for authenticating the secret word
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

        const { secretWord } = body;

        // Instead of hardcoding "panda", check against the secret_words table in Supabase
        if (!secretWord) {
            return response.status(401).json({
                ok: false,
                error: 'Secret word is required'
            });
        }

        // Check against the hardcoded value "demo"
        if (secretWord.trim().toLowerCase() !== 'demo') {
            return response.status(401).json({
                ok: false,
                error: 'Wrong word! Hint: What is the demo password?'
            });
        }

        // If the secret word is correct, return success
        return response.status(200).json({
            ok: true,
            message: 'Authentication successful'
        });
    } catch (error) {
        console.error("Error processing authentication:", error);
        return response.status(500).json({
            ok: false,
            error: "Failed to process authentication",
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
        });
    }
}