-- Create a test customer user directly in the database
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
  'customer@loop.com',
  crypt('customer123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Test Customer","role":"customer"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Note: The 'handle_new_user' trigger will automatically create the profile entry
-- with the 'customer' role based on the raw_user_meta_data.
