
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
    const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-zinc-900 text-white">
                    <div className="flex items-center space-x-3">
                        <ShoppingBag size={20} />
                        <h2 className="font-black uppercase tracking-widest text-sm">Your Bag</h2>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                            <ShoppingBag size={48} className="text-zinc-300" />
                            <p className="font-black uppercase tracking-widest text-xs">Your bag is empty</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-red-500 font-bold text-xs uppercase tracking-widest hover:underline"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item, idx) => (
                            <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 group">
                                <div className="w-24 h-24 bg-gray-50 rounded-2xl p-2 flex items-center justify-center shrink-0">
                                    <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-black text-sm uppercase leading-tight pr-4">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-2 truncate">
                                        {item.selectedColor && <span className="mr-2">{item.selectedColor}</span>}
                                        {item.selectedSize && <span>{item.selectedSize}</span>}
                                    </div>
                                    <div className="mt-auto flex justify-between items-center">
                                        <div className="font-black text-sm text-zinc-900">${item.price * item.quantity}</div>
                                        <div className="flex items-center bg-gray-50 rounded-full h-8 px-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1, item.selectedColor, item.selectedSize)}
                                                className="w-6 h-full flex items-center justify-center hover:text-red-500"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1, item.selectedColor, item.selectedSize)}
                                                className="w-6 h-full flex items-center justify-center hover:text-red-500"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-end mb-6">
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Total</span>
                            <span className="text-2xl font-black text-zinc-900">${cartTotal}</span>
                        </div>
                        <button className="w-full bg-red-500 text-white py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-zinc-900 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-500/20">
                            Checkout <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
