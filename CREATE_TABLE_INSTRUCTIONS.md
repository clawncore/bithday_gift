# Instructions to Create the Replies Table in Supabase

To complete the Supabase integration, you need to manually create the `replies` table in your Supabase project.

## Steps:

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** (left sidebar menu)
3. Click **"New Query"**
4. Paste the following SQL code:

```sql
CREATE TABLE IF NOT EXISTS replies (
  id VARCHAR(255) PRIMARY KEY,
  token_id VARCHAR(255) NOT NULL,
  choice VARCHAR(20) NOT NULL CHECK (choice IN ('yes', 'need_time')),
  message TEXT NOT NULL,
  recipient_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_replies_recipient_name ON replies(recipient_name);
CREATE INDEX IF NOT EXISTS idx_replies_created_at ON replies(created_at);
```

5. Click **"Run"** to execute the query

## Verification:

After creating the table, you can verify it works by:

1. Running the test script:
   ```bash
   node test-get-replies.js
   ```

2. Or checking in your browser by visiting:
   ```
   http://localhost:5006/api/get-replies
   ```

Once the table is created, both the reply submission and retrieval features will work correctly.