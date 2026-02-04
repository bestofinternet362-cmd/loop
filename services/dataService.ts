
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const STORAGE_KEY = 'loop_local_products';

export const getProducts = async (): Promise<Product[]> => {
  if (supabase) {
    const { data, error } = await supabase.from('products').select('*');
    if (!error && data && data.length > 0) {
      // Map Supabase snake_case to app camelCase
      return data.map((item: any) => ({
        ...item,
        isBestSeller: item.is_best_seller, // valid JS property access
        // Remove snake_case versions if needed, or keep them
      })) as Product[];
    }
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
    // Map app camelCase to Supabase snake_case
    const dbProduct = {
      ...product,
      is_best_seller: product.isBestSeller,
      // Remove camelCase versions if needed for strict schema
    };

    // We need to cast to any or a DB type because product types don't match DB exactly
    const { error } = await supabase.from('products').upsert(dbProduct as any);
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

export interface OrderData {
  email: string;
  total_amount: number;
  status: 'pending' | 'paid';
  shipping_address: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

export interface OrderItemData {
  product_id: string;
  quantity: number;
  price_at_time: number;
  selected_color?: string;
  selected_size?: string;
}

export const createOrder = async (orderData: OrderData, items: OrderItemData[]) => {
  if (!supabase) {
    console.warn('Supabase not configured, order not saved to DB');
    return { success: true, id: 'local-order-' + Date.now() };
  }

  try {
    // 1. Create Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        email: orderData.email,
        total_amount: orderData.total_amount,
        status: orderData.status,
        shipping_address: orderData.shipping_address
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Create Order Items
    const orderItems = items.map(item => ({
      order_id: order.id,
      ...item
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { success: true, id: order.id, order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error };
  }
};
