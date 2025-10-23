// Simple API endpoint for replying to the gift
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

    const { choice, message } = body;

    if (!message || message.trim().length === 0) {
        return response.status(400).json({ error: 'Message cannot be empty' });
    }

    // In a real implementation, you would save this to storage
    console.log('Reply received:', { choice, message });

    return response.status(200).json({ ok: true });
}