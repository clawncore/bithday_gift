import { createClient } from '@supabase/supabase-js'

// Load environment variables
import dotenv from 'dotenv'
dotenv.config()

// Get Supabase URL and service role key from environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl) {
  console.warn('Missing SUPABASE_URL environment variable')
  console.warn('Please set SUPABASE_URL in your .env file')
}

if (!supabaseServiceRoleKey) {
  console.warn('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  console.warn('Please set SUPABASE_SERVICE_ROLE_KEY in your .env file')
}

// Create Supabase client with service role key for server-side operations
// If environment variables are missing, create a client that will show errors when used
export const supabase = supabaseUrl && supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : createClient('http://missing-url.supabase.co', 'missing-key')