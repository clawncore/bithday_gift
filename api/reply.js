// Simple API endpoint for replying to the gift
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

    if (!message || message.trim().length === 0) {
        return response.status(400).json({ error: 'Message cannot be empty' });
    }

    // In a real implementation, you would save this to storage
    console.log('Reply received:', { choice, message });

    return response.status(200).json({ ok: true });
}