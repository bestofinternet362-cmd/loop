
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const STORAGE_KEY = 'loop_local_products';

export const getProducts = async (): Promise<Product[]> => {
  if (supabase) {
    const { data, error } = await supabase.from('products').select('*');
    if (!error && data && data.length > 0) return data as Product[];
  }

  // Fallback / Initial Seed
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(stored);
};

export const saveProduct = async (product: Product): Promise<Product[]> => {
  if (supabase) {
    const { error } = await supabase.from('products').upsert(product);
    if (!error) return await getProducts();
  }

  // Local Fallback
  const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const index = products.findIndex((p: Product) => p.id === product.id);
  let updated;
  if (index >= 0) {
    updated = [...products];
    updated[index] = product;
  } else {
    updated = [...products, { ...product, id: Date.now().toString() }];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteProduct = async (id: string): Promise<Product[]> => {
  if (supabase) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) return await getProducts();
  }

  // Local Fallback
  const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const updated = products.filter((p: Product) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find(p => p.id === id);
};
