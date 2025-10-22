# Prisma ORM Setup for Happy Birthday Reel

This document explains how to set up Prisma ORM for the Happy Birthday Reel project to store and retrieve Chandrika's responses.

## Prerequisites

1. Prisma has already been installed and initialized in this project
2. You have a Supabase account and project set up

## Current Setup

The project now uses Prisma ORM for database operations:
- Prisma schema is defined in [prisma/schema.prisma](file:///c%3A/xampp/htdocs/src/HappyBirthdayReel/prisma/schema.prisma)
- Prisma client is used in [server/storage.ts](file:///c%3A/xampp/htdocs/src/HappyBirthdayReel/server/storage.ts) and [server/routes.ts](file:///c%3A/xampp/htdocs/src/HappyBirthdayReel/server/routes.ts)
- Database connection is configured in [.env](file:///c%3A/xampp/htdocs/src/HappyBirthdayReel/.env) with the DATABASE_URL variable

## Database Tables

Prisma is configured to work with two tables:

### replies
- `id`: VARCHAR(255) PRIMARY KEY
- `token_id`: VARCHAR(255) NOT NULL
- `choice`: VARCHAR(20) NOT NULL CHECK (choice IN ('yes', 'need_time'))
- `message`: TEXT NOT NULL
- `recipient_name`: VARCHAR(255) NOT NULL
- `created_at`: TIMESTAMP NOT NULL DEFAULT NOW()

### tokens
- `id`: VARCHAR(255) PRIMARY KEY
- `used`: BOOLEAN NOT NULL DEFAULT false
- `created_at`: TIMESTAMP NOT NULL DEFAULT NOW()
- `opened_at`: TIMESTAMP
- `expires_at`: TIMESTAMP

## How It Works

1. When Chandrika responds to the apology through the [AskSection](file:///c%3A/xampp/htdocs/src/HappyBirthdayReel/client/src/components/AskSection.tsx#L11-L12) component, her response is saved to both:
   - In-memory storage (for immediate use)
   - Database using Prisma ORM (for persistence)

2. The responses can be viewed in the [ChandrikaResponses](file:///c%3A/xampp/htdocs/src/HappyBirthdayReel/client/src/components/ChandrikaResponses.tsx#L15-L15) component on the gift page

3. All data is stored in your Supabase database

## API Endpoints

- `POST /api/reply` - Save a reply to database using Prisma
- `GET /api/get-replies` - Retrieve all replies from database using Prisma

## Creating Database Tables

Since direct database migrations are not working due to authentication issues, you need to create the tables manually in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** (left sidebar menu)
3. Click **"New Query"**
4. Paste the following SQL code:

```sql
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
```

5. Click **"Run"** to execute the query

## Graceful Error Handling

The application is designed to work even if the database is not available:
- Replies are always saved to in-memory storage
- Database operations are attempted but failures are logged and ignored
- When fetching replies, if the database is unavailable, an empty array is returned

## Prisma Commands

You can use the following npm scripts:

```bash
# Generate Prisma client
npm run prisma:generate

# Initialize database tables (if authentication worked)
npm run prisma:init-tables
```

## Security Notes

- The service role key should only be used server-side
- The anon key is used client-side for read operations
- All data is stored securely in your Supabase project