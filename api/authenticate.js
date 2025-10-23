// API endpoint for authenticating the secret word
export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    // Parse the body properly for Vercel
    let body;
    try {
        if (typeof request.body === 'string') {
            body = JSON.parse(request.body);
        } else {
            body = request.body || {};
        }
    } catch (e) {
        body = {};
    }

    const secretWord = body.secretWord;

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