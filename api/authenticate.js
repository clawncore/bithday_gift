// API endpoint for authenticating the secret word
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

    const { secretWord } = body;

    // In a real implementation, you would check this against a database or other storage
    // For now, we'll check against the hardcoded value "panda"
    if (!secretWord || secretWord.trim().toLowerCase() !== 'panda') {
        return response.status(401).json({
            ok: false,
            error: 'Invalid secret word'
        });
    }

    // If the secret word is correct, return success
    return response.status(200).json({
        ok: true,
        message: 'Authentication successful'
    });
}