// API endpoint to get replies from Supabase
import { supabase } from '../server/supabaseClient';

// API endpoint to get replies - Vercel compatible version
export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    // For now, return empty replies array
    // In a production environment, you would connect to your database
    return response.status(200).json({
        ok: true,
        replies: []
    });
}
