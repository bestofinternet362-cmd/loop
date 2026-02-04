-- LOOP E-Commerce Product Database Schema
-- Run this SQL in your Supabase SQL Editor to create the products table

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  is_best_seller BOOLEAN DEFAULT FALSE,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  
  -- Extended product details
  colors JSONB,
  sizes TEXT[],
  weight TEXT,
  dimensions JSONB,
  material TEXT,
  features TEXT[],
  shape TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(is_best_seller) WHERE is_best_seller = TRUE;
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock) WHERE stock > 0;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Create policies for authenticated users to insert/update/delete
-- (You can modify these based on your authentication requirements)
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE USING (true);
