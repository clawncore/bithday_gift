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

    // Instead of hardcoding "panda", check against the secret_words table in Supabase
    if (!secretWord) {
        return response.status(401).json({
            ok: false,
            error: 'Secret word is required'
        });
    }

    // For now, we'll still check against the hardcoded value "panda"
    // In a future update, we can query the secret_words table in Supabase
    if (secretWord.trim().toLowerCase() !== 'panda') {
        return response.status(401).json({
            ok: false,
            error: 'Wrong word! Hint: What is your favorite animal?'
        });
    }

    // If the secret word is correct, return success
    return response.status(200).json({
        ok: true,
        message: 'Authentication successful'
    });
}