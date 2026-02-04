# Best Prompt for Supabase & Auth Integration

Here is the comprehensive prompt that describes the entire backend system we built. You can use this as a reference or to generate similar systems in the future.

---

**System Role:** You are an expert Full Stack Developer specializing in React, TypeScript, and Supabase.

**Request:**
I have an existing React e-commerce application using local constants for data. I need you to migrate the backend to **Supabase** and implement a secure **Authentication & Admin System**.

Please implement the following:

### 1. Database Schema
Create a robust SQL schema for a `products` table that supports:
- Basic fields: `id` (UUID), `name`, `price`, `description`, `stock`, `category`.
- Complex JSONB fields for flexibility: `colors` (array of name/hex), `dimensions` (width/height/depth), and `features` (array of strings).
- Search optimization: Add an index for the product name.
- Security: Enable Row Level Security (RLS) allowing public read access but restricting write access to authenticated users only.

### 2. User Authentication & Roles
Set up a secure Role-Based Access Control (RBAC) system:
- Create a `profiles` table linked to `auth.users` via foreign key.
- Fields: `full_name`, `email`, and `role` (strictly 'customer' or 'admin').
- **Automation**: Write a PostgreSQL Database Trigger/Function that automatically creates a `profiles` entry with the 'customer' role whenever a new user signs up.
- **Security**: Implement RLS policies:
    - Users can read/update their own profile.
    - Admins can view all profiles.

### 3. Data Migration Script
Write a Node.js script (`scripts/migrateToSupabase.ts`) to:
- Read `INITIAL_PRODUCTS` from my local `constants.ts`.
- Map the data to match the database columns (converting camelCase to snake_case if necessary, e.g., `isBestSeller` -> `is_best_seller`).
- Upload all products to the Supabase `products` table.
- Handle environment variables securely using `dotenv`.

### 4. Frontend Integration
- **Client**: Initialize the Supabase client in `lib/supabase.ts` using Vite environment variables.
- **Service Layer**: Refactor `services/dataService.ts` to:
    - Attempt to fetch/save data from Supabase first.
    - Fallback to `localStorage` if the connection fails (for offline dev).
    - **Crucial**: Map the incoming snake_case database fields back to the application's camelCase types (e.g., ensure `isBestSeller` is correctly populated for the UI).

### 5. Access Control
- Create a `components/ProtectedRoute.tsx` wrapper that checks the user's role.
- If a 'customer' tries to access `/admin`, redirect them or show an "Access Denied" page.
- Create a custom hook `useAuth()` that exposes `user`, `isAdmin`, and auth methods (`signIn`, `signUp`, `signOut`).
