import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
    console.warn('Missing VITE_SUPABASE_URL environment variable')
    console.warn('Please set VITE_SUPABASE_URL in your .env file')
}

if (!supabaseAnonKey) {
    console.warn('Missing VITE_SUPABASE_ANON_KEY environment variable')
    console.warn('Please set VITE_SUPABASE_ANON_KEY in your .env file')
}

// Create Supabase client
// If environment variables are missing, create a client that will show errors when used
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient('http://missing-url.supabase.co', 'missing-key')