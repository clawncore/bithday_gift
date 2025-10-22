-- Create replies table
CREATE TABLE IF NOT EXISTS replies (
  id VARCHAR(255) PRIMARY KEY,
  token_id VARCHAR(255) NOT NULL,
  choice VARCHAR(20) NOT NULL CHECK (choice IN ('yes', 'need_time')),
  message TEXT NOT NULL,
  recipient_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_replies_recipient_name ON replies(recipient_name);
CREATE INDEX IF NOT EXISTS idx_replies_created_at ON replies(created_at);