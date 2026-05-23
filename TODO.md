# TODO - Connect NYOTA to Supabase

## Step 1: Set up environment variables
- [x] Create .env.local file with Supabase credentials
- [x] Verify environment variables are properly configured

## Step 2: Update Supabase client configuration
- [x] Update src/lib/supabase/client.ts to use environment variables

## Step 3: Update apply page to submit to Supabase
- [x] Import supabase client in apply page
- [x] Update handleSubmit to insert data into Supabase
- [x] Add proper error handling

## Step 4: Create database tables SQL script
- [x] Create SQL script for Supabase table creation

## Step 5: Next Steps
1. Run the SQL script in Supabase SQL Editor to create tables
2. Start the development server and test the application
