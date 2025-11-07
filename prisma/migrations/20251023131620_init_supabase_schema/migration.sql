-- Create replies table
CREATE TABLE IF NOT EXISTS replies (
  id VARCHAR(255) PRIMARY KEY,
  token_id VARCHAR(255) NOT NULL,
  choice VARCHAR(20) NOT NULL CHECK (choice IN ('yes', 'need_time')),
  message TEXT NOT NULL,
  recipient_name VARCHAR(255) NOT NULL DEFAULT 'Jane Doe',
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

-- Create secret_words table
CREATE TABLE IF NOT EXISTS secret_words (
  id VARCHAR(255) PRIMARY KEY,
  word VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE UNIQUE INDEX IF NOT EXISTS idx_secret_words_word ON secret_words(word);
