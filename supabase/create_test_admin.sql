-- Create a test admin user directly in the database
-- Run this in Supabase SQL Editor

-- 1. Insert user into auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(),
  'authenticated',
  'authenticated',
  'admin@loop.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Test Admin","role":"admin"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- 2. The trigger we set up earlier will automatically create the profile entry
-- and set the role to 'customer' by default (or 'admin' if we updated the trigger to read metadata)

-- 3. Explicitly ensure the role is set to 'admin' in the profiles table for this user
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@loop.com';
