# Happy Birthday Reel

A special birthday gift website with memories, messages, and interactive elements.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. Create a `.env` file in the root directory with your Supabase configuration:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   DATABASE_URL=your_database_connection_string
   ```

3. Create the replies and tokens tables in your Supabase SQL editor:
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

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Start the client development server (in a separate terminal):
   ```bash
   npm run dev:client
   ```

## Database Setup

This project now uses Prisma ORM for database operations. For detailed setup instructions, see [PRISMA_SETUP.md](PRISMA_SETUP.md).

## Deployment

For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Features

- Interactive birthday card with animations
- Chronological memory slideshow
- Personal messages with apologies
- Response collection system with Supabase integration
- Responsive design for all devices