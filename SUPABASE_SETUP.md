# Supabase Setup Guide for LOOP E-Commerce

This guide will help you set up Supabase for your LOOP e-commerce application.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: loop-ecommerce (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Click "Create new project" and wait for it to initialize (2-3 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## Step 3: Configure Environment Variables

1. Open the `.env` file in your project root
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Save the file

## Step 4: Create the Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the SQL
6. You should see "Success. No rows returned" message

This creates:
- `products` table with all required fields
- Indexes for better performance
- Row Level Security (RLS) policies
- Automatic timestamp updates

## Step 5: Migrate Your Products

Run the migration script to upload your initial products:

```bash
npm run dev
```

Then in a new terminal:

```bash
npx tsx scripts/migrateToSupabase.ts
```

You should see:
```
🚀 Starting product migration to Supabase...
📦 Inserting 18 products...
✅ Successfully migrated 18 products to Supabase!
🎉 Migration complete!
```

## Step 6: Verify the Setup

1. Go to your Supabase dashboard → **Table Editor**
2. Click on the `products` table
3. You should see all 18 products listed

## Step 7: Test the Application

1. Make sure your dev server is running: `npm run dev`
2. Open http://localhost:3000
3. Navigate to the Shop page
4. All products should load from Supabase

## Troubleshooting

### Products not loading?

1. Check browser console for errors
2. Verify your `.env` file has the correct credentials
3. Make sure you ran the schema.sql in Supabase
4. Check Supabase dashboard → **Logs** for any errors

### Migration script fails?

1. Ensure your `.env` file is configured
2. Check that the products table exists in Supabase
3. Verify RLS policies are set correctly

### Still using localStorage?

The app will automatically fall back to localStorage if Supabase is not configured. Check the browser console for:
- ✅ "Supabase client initialized" (good!)
- ⚠️ "Supabase not configured - using localStorage fallback" (needs setup)

## Next Steps

- Set up authentication for admin users
- Configure RLS policies for production
- Add image upload to Supabase Storage
- Enable real-time subscriptions for live updates

## Support

If you encounter any issues, check:
- Supabase documentation: https://supabase.com/docs
- Project logs in Supabase dashboard
- Browser console for error messages
