# Authentication Setup Guide

## Step 1: Run the Auth Schema in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click "New query"
4. Open the file `supabase/auth-schema.sql` in your project
5. Copy the entire contents
6. Paste into the SQL editor
7. Click "Run"

This creates:
- `profiles` table for user data and roles
- Row Level Security (RLS) policies
- Automatic profile creation trigger
- Updated timestamp trigger

## Step 2: Test the Authentication

### Create a Customer Account

1. Start your dev server: `npm run dev`
2. Navigate to http://localhost:3000
3. Click "Login" in the navbar
4. Click "Sign Up"
5. Fill in:
   - Full Name: Your Name
   - Email: your@email.com
   - Password: (at least 6 characters)
   - Account Type: **Customer**
6. Click "Create Account"
7. Check your email for confirmation link
8. Click the confirmation link
9. Return to the app and sign in

### Create an Admin Account

**Option 1: Sign up and manually upgrade**
1. Sign up as a customer (follow steps above)
2. Go to Supabase Dashboard → Table Editor → profiles
3. Find your user and change `role` from 'customer' to 'admin'

**Option 2: Via SQL**
```sql
-- After signing up, run this in SQL Editor
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin@email.com';
```

## Step 3: Test Features

### Customer Features
- ✅ Sign up and sign in
- ✅ View products
- ✅ See user dropdown in navbar
- ✅ Cannot access /admin (403 error)
- ✅ Sign out

### Admin Features
- ✅ Sign in with admin account
- ✅ See "Admin" link in navbar
- ✅ Access /admin page
- ✅ Admin badge in user dropdown
- ✅ Manage products (existing admin functionality)

## Troubleshooting

### "Check your email to confirm your account"
- Supabase requires email confirmation by default
- Check your spam folder
- Or disable email confirmation in Supabase: Authentication → Settings → Email Auth → Disable "Confirm email"

### Can't access admin page
- Make sure your user's role is set to 'admin' in the profiles table
- Sign out and sign in again to refresh the session

### Auth not working
- Check browser console for errors
- Verify the auth-schema.sql was run successfully
- Check Supabase logs for any errors

## Security Notes

- Passwords are hashed by Supabase Auth
- RLS policies protect user data
- Admin routes are protected on both frontend and backend
- Session tokens are stored securely by Supabase

## Next Steps

- Customize the login page design
- Add password reset functionality
- Add email verification flow
- Implement user profile editing
- Add more admin features
