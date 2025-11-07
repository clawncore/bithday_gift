// Simple API endpoint for replying to the gift - Vercel compatible version
// Avoiding complex imports that might cause issues in serverless environment
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

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

        const { choice, message } = body;

        // Validate choice
        if (!choice || (choice !== "yes" && choice !== "need_time")) {
            return response.status(400).json({ error: "Invalid choice value" });
        }

        // Validate message
        if (!message || typeof message !== "string" || message.trim().length === 0) {
            return response.status(400).json({ error: "Message cannot be empty" });
        }

        // Save reply to Supabase if available
        if (supabase) {
            try {
                const { error } = await supabase
                    .from("replies")
                    .insert({
                        id: randomUUID(),
                        choice: choice,
                        message: message,
                        recipient_name: "Jane Doe",
                        created_at: new Date(),
                    });

                if (error) {
                    console.error('Error saving reply to Supabase:', error);
                    return response.status(500).json({
                        error: "Failed to save reply to database",
                        message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
                    });
                }

                console.log('Reply successfully saved to Supabase:', { choice, message });
            } catch (dbError) {
                console.error("Database error:", dbError);
                return response.status(500).json({
                    error: "Database connection failed",
                    message: process.env.NODE_ENV === "development" ? dbError.message : "Something went wrong"
                });
            }
        } else {
            // Just log the reply if database is not available
            console.log('Reply received (database not available):', { choice, message });
        }

        return response.status(200).json({ ok: true });
    } catch (error) {
        console.error("Error processing reply:", error);
        return response.status(500).json({
            error: "Failed to process reply",
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
        });
    }
}