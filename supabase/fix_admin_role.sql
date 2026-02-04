-- FORCE ADMIN ROLE
-- Run this in Supabase SQL Editor to verify/fix your admin status

-- 1. Insert or Update the profile for admin@loop.com
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'admin@loop.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';

-- 2. Check the result
SELECT email, role FROM public.profiles WHERE email = 'admin@loop.com';
