
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types';

export interface CartItem extends Product {
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

interface CartContextType {
    items: CartItem[];
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    addToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
    removeFromCart: (id: string, color?: string, size?: string) => void;
    updateQuantity: (id: string, delta: number, color?: string, size?: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('loop_cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('loop_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, quantity: number, color?: string, size?: string) => {
        setItems(prev => {
            const existing = prev.find(item =>
                item.id === product.id &&
                item.selectedColor === color &&
                item.selectedSize === size
            );

            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && item.selectedColor === color && item.selectedSize === size)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { ...product, quantity, selectedColor: color, selectedSize: size }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string, color?: string, size?: string) => {
        setItems(prev => prev.filter(item =>
            !(item.id === id && item.selectedColor === color && item.selectedSize === size)
        ));
    };

    const updateQuantity = (id: string, delta: number, color?: string, size?: string) => {
        setItems(prev => prev.map(item => {
            if (item.id === id && item.selectedColor === color && item.selectedSize === size) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items, isCartOpen, setIsCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
