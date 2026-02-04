import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Create Supabase client (will be null if not configured)
export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Log configuration status (only in development)
if (import.meta.env.DEV) {
    if (isSupabaseConfigured) {
        console.log('✅ Supabase client initialized');
    } else {
        console.warn('⚠️ Supabase not configured - using localStorage fallback');
    }
}
