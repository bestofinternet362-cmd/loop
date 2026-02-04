import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { INITIAL_PRODUCTS } from '../constants';
import { resolve } from 'path';

/**
 * Migration script to upload initial products to Supabase
 * Run this script once after setting up your Supabase database
 */

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Debug logging
console.log('Environment check:');
console.log('- Supabase URL:', supabaseUrl ? '✓ Set' : '✗ Not set');
console.log('- Supabase Key:', supabaseAnonKey ? '✓ Set' : '✗ Not set');
console.log('');

async function migrateProducts() {
    console.log('🚀 Starting product migration to Supabase...\n');

    if (!isSupabaseConfigured) {
        console.error('❌ Supabase is not configured!');
        console.log('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
        process.exit(1);
    }

    if (!supabase) {
        console.error('❌ Supabase client not initialized');
        process.exit(1);
    }

    try {
        // Check if products already exist
        const { data: existingProducts, error: checkError } = await supabase
            .from('products')
            .select('id')
            .limit(1);

        if (checkError) {
            console.error('❌ Error checking existing products:', checkError.message);
            console.log('\n💡 Make sure you have run the schema.sql file in your Supabase SQL Editor');
            process.exit(1);
        }

        if (existingProducts && existingProducts.length > 0) {
            console.log('⚠️  Products already exist in the database');
            console.log('Do you want to replace them? (This will delete all existing products)');
            console.log('To proceed, modify this script to include the deletion step.\n');
            return;
        }

        // Transform products to match database schema
        const productsToInsert = INITIAL_PRODUCTS.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image,
            is_best_seller: product.isBestSeller || false,
            stock: product.stock,
            colors: product.colors || null,
            sizes: product.sizes || null,
            weight: product.weight || null,
            dimensions: product.dimensions || null,
            material: product.material || null,
            features: product.features || null,
            shape: product.shape || null
        }));

        // Insert products
        console.log(`📦 Inserting ${productsToInsert.length} products...`);
        const { data, error } = await supabase
            .from('products')
            .insert(productsToInsert)
            .select();

        if (error) {
            console.error('❌ Error inserting products:', error.message);
            process.exit(1);
        }

        console.log(`✅ Successfully migrated ${data?.length || 0} products to Supabase!`);
        console.log('\n📊 Product categories:');

        const categories = new Set(INITIAL_PRODUCTS.map(p => p.category));
        categories.forEach(cat => {
            const count = INITIAL_PRODUCTS.filter(p => p.category === cat).length;
            console.log(`   - ${cat}: ${count} products`);
        });

        console.log('\n🎉 Migration complete!');

    } catch (error) {
        console.error('❌ Unexpected error:', error);
        process.exit(1);
    }
}

// Run migration
migrateProducts();
