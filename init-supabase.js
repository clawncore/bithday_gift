// Script to initialize Supabase tables
import { supabase } from './server/supabaseClient';
import { randomUUID } from 'crypto';

async function initSupabaseTables() {
    console.log('Initializing Supabase tables...');

    try {
        // Check if replies table exists by attempting to query it
        const { data, error } = await supabase
            .from('replies')
            .select('id')
            .limit(1);

        if (error && error.code === '42P01') {
            // Table doesn't exist, create it
            console.log('Replies table does not exist. Please run the SQL migration manually or use drizzle-kit to create tables.');
            console.log('You can run: npx drizzle-kit push');
            return;
        }

        if (error) {
            console.error('Error checking replies table:', error);
            return;
        }

        console.log('Supabase tables are ready!');
        console.log('Found existing replies table with data structure.');

    } catch (error) {
        console.error('Error initializing Supabase tables:', error);
    }
}

// Run the initialization
initSupabaseTables();