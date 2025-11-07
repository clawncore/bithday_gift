// API endpoint to get replies - Vercel compatible version
// Avoiding complex imports that might cause issues in serverless environment
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase;
if (supabaseUrl && supabaseServiceRoleKey) {
    supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
} else {
    console.warn('Supabase environment variables not set');
}

export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Fetch replies from Supabase if available
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from("replies")
                    .select("id, choice, message, recipient_name, created_at")
                    .eq("recipient_name", "Jane Doe")
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error('Error fetching replies from Supabase:', error);
                    return response.status(500).json({
                        ok: false,
                        error: "Failed to fetch replies from database",
                        message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
                    });
                }

                return response.status(200).json({
                    ok: true,
                    replies: data ? data.map(reply => ({
                        choice: reply.choice,
                        message: reply.message,
                        timestamp: reply.created_at
                    })) : []
                });
            } catch (dbError) {
                console.error("Database error:", dbError);
                return response.status(500).json({
                    ok: false,
                    error: "Database connection failed",
                    message: process.env.NODE_ENV === "development" ? dbError.message : "Something went wrong"
                });
            }
        } else {
            // Return empty array if database is not available
            return response.status(200).json({
                ok: true,
                replies: []
            });
        }
    } catch (error) {
        console.error("Error fetching replies:", error);
        return response.status(500).json({
            ok: false,
            error: "Failed to fetch replies",
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
        });
    }
}