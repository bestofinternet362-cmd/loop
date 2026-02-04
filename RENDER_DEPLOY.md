# Deploying Loop E-Commerce to Render

Since this is a React application built with Vite, we will deploy it as a **Static Site** on Render.

## Step 1: Sign up / Log in to Render

1.  Go to [https://render.com](https://render.com).
2.  Sign up or Log in (it's easiest to sign up with GitHub).

## Step 2: Create a New Static Site

1.  Click the **"New +"** button in the dashboard header.
2.  Select **"Static Site"**.
3.  Connect your GitHub account if you haven't already.
4.  Search for your repository **"loop"** (or whatever you named it on GitHub).
5.  Click **"Connect"**.

## Step 3: Configure the Build

Fill in the settings as follows:

-   **Name:** `loop-ecommerce` (or any name you like)
-   **Branch:** `main`
-   **Root Directory:** `.` (leave blank)
-   **Build Command:** `npm run build`
-   **Publish Directory:** `dist`

## Step 4: Environment Variables

This is critical! Your app needs the Supabase URL and Key to work.

1.  Scroll down to the **"Environment Variables"** section (or "Advanced").
2.  Click **"Add Environment Variable"**.
3.  Add the same variables from your `.env` file:

    | Key | Value |
    | :--- | :--- |
    | `VITE_SUPABASE_URL` | Your Supabase Project URL |
    | `VITE_SUPABASE_ANON_KEY` | Your Supabase Anon Key |

    *(You can copy these from your local `.env` file or your Supabase dashboard)*

## Step 5: Deploy

1.  Click **"Create Static Site"**.
2.  Render will verify the git repo, run `npm install`, then `npm run build`.
3.  Once the build finishes, you will see a green **"Live"** badge.
4.  Click the URL provided (e.g., `https://loop-ecommerce.onrender.com`) to view your site!

## Troubleshooting

-   **White screen on load?** Check the **Browser Console** (F12) for errors.
-   **Login failing?** Double-check that your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct in the Render Environment Variables settings.
-   **Routes not working on refresh?** Render handles this automatically for Static Sites by redirecting all traffic to `index.html`, so your React Router should work fine.

## Updating your Site

Whenever you push code to GitHub:
```bash
git add .
git commit -m "New features"
git push
```
Render will automatically detect the changes and rebuild your site!
