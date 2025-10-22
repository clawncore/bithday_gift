// API endpoint to get replies from Supabase
import { supabase } from '../server/supabaseClient';

export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get all replies for Chandrika from Supabase
        const { data, error } = await supabase
            .from('replies')
            .select('*')
            .eq('recipient_name', 'Chandrika')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching replies from Supabase:', error);
            return response.status(500).json({ error: 'Failed to fetch replies' });
        }

        return response.status(200).json({
            ok: true,
            replies: data || []
        });
    } catch (error) {
        console.error('Error in get-replies endpoint:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}