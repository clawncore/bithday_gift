// Simple API endpoint for replying to the gift
export default function handler(request, response) {
  // For demo purposes, we'll return a simple response
  // In a real implementation, you would connect to your database or storage
  
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }
  
  const { choice, message } = request.body;
  
  if (!message || message.trim().length === 0) {
    return response.status(400).json({ error: 'Message cannot be empty' });
  }
  
  // In a real implementation, you would save this to storage
  console.log('Reply received:', { choice, message });
  
  return response.status(200).json({ ok: true });
}