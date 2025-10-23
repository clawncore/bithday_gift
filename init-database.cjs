const { createClient } = require('@supabase/supabase-js');
const { randomUUID } = require('crypto');

// Load environment variables
require('dotenv').config();

// Get Supabase URL and service role key from environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create Supabase client with service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function initDatabase() {
  console.log('Initializing database with secret word...');
  
  try {
    // Insert the secret word "panda" into the secret_words table
    const { data, error } = await supabase
      .from('secret_words')
      .insert({
        id: randomUUID(),
        word: 'panda',
        is_active: true,
        created_at: new Date(),
      });
      
    if (error) {
      console.error('Error inserting secret word:', error);
      return;
    }
    
    console.log('Secret word "panda" inserted successfully!');
    
    // Test retrieving the secret word
    const { data: secretWords, error: selectError } = await supabase
      .from('secret_words')
      .select('word')
      .eq('word', 'panda')
      .eq('is_active', true);
      
    if (selectError) {
      console.error('Error retrieving secret word:', selectError);
      return;
    }
    
    if (secretWords && secretWords.length > 0) {
      console.log('Successfully verified secret word in database:', secretWords[0].word);
    } else {
      console.log('Secret word not found in database');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initDatabase();