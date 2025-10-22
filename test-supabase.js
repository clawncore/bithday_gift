// Test script to verify Supabase integration
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Get Supabase URL and service role key from environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl) {
    console.error('Missing SUPABASE_URL environment variable')
    process.exit(1)
}

if (!supabaseServiceRoleKey) {
    console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
    process.exit(1)
}

// Create Supabase client with service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function testSupabaseConnection() {
    console.log('Testing Supabase connection...')

    try {
        // Test a simple query to see if we can connect
        const { data, error } = await supabase
            .from('replies')
            .select('id')
            .limit(1)

        if (error && error.code === '42P01') {
            console.log('Replies table does not exist yet - this is expected')
            console.log('Please create the tables in Supabase SQL editor')
            console.log('SQL to create tables:')
            console.log(`
                -- Create replies table
                CREATE TABLE IF NOT EXISTS replies (
                  id VARCHAR(255) PRIMARY KEY,
                  token_id VARCHAR(255) NOT NULL,
                  choice VARCHAR(20) NOT NULL CHECK (choice IN ('yes', 'need_time')),
                  message TEXT NOT NULL,
                  recipient_name VARCHAR(255) NOT NULL,
                  created_at TIMESTAMP NOT NULL DEFAULT NOW()
                );
                
                -- Create indexes for faster queries
                CREATE INDEX IF NOT EXISTS idx_replies_recipient_name ON replies(recipient_name);
                CREATE INDEX IF NOT EXISTS idx_replies_created_at ON replies(created_at);
                
                -- Create tokens table
                CREATE TABLE IF NOT EXISTS tokens (
                  id VARCHAR(255) PRIMARY KEY,
                  used BOOLEAN NOT NULL DEFAULT false,
                  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                  opened_at TIMESTAMP,
                  expires_at TIMESTAMP
                );
            `)
            return
        }

        if (error) {
            console.error('Error querying Supabase:', error)
            return
        }

        console.log('Successfully connected to Supabase')
        console.log('Found data:', data)
    } catch (error) {
        console.error('Error during Supabase test:', error)
    }
}

// Run the test
testSupabaseConnection()