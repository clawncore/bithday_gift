# Supabase Setup for Happy Birthday Reel

This document explains how to set up Supabase for the Happy Birthday Reel project to store and retrieve Chandrika's responses.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new Supabase project

## Setup Instructions

### 1. Configure Environment Variables

Update the [.env](file:///c%3A/xampp/htdocs/src/HappyBirthdayReel/.env) file with your Supabase project details:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# For server-side usage
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Replace the placeholder values with your actual Supabase project details:
- `your_supabase_project_url`: Found in your Supabase project dashboard (API Settings)
- `your_supabase_anon_key`: Found in your Supabase project dashboard (API Settings)
- `your_supabase_service_role_key`: Found in your Supabase project dashboard (API Settings)

### 2. Create the Replies Table

You need to manually create the replies table in your Supabase project:

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

### 3. How It Works

1. When Chandrika responds to the apology through the [AskSection](file:///c%3A/xampp/htdocs/src/HappyBirthdayReel/client/src/components/AskSection.tsx#L11-L12) component, her response is saved to both:
   - In-memory storage (for immediate use)
   - Supabase database (for persistence)

2. The responses can be viewed in the [ChandrikaResponses](file:///c%3A/xampp/htdocs/src/HappyBirthdayReel/client/src/components/ChandrikaResponses.tsx#L15-L15) component on the gift page

3. All data is stored in the `replies` table in your Supabase database

## API Endpoints

- `POST /api/reply` - Save a reply to Supabase
- `GET /api/get-replies` - Retrieve all replies from Supabase

## Security Notes

- The service role key should only be used server-side
- The anon key is used client-side for read operations
- All data is stored securely in your Supabase project