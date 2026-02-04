
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';

const Checkout: React.FC = () => {
    const { items, cartTotal, clearCart } = useCart();
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        fullName: profile?.full_name || '',
        email: user?.email || '',
        address: '',
        city: '',
        zipCode: '',
        country: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const orderData = {
            email: formData.email,
            total_amount: cartTotal,
            status: 'paid' as const,
            shipping_address: {
                fullName: formData.fullName,
                address: formData.address,
                city: formData.city,
                zipCode: formData.zipCode,
                country: formData.country
            }
        };

        const orderItems = items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price_at_time: item.price,
            selected_color: item.selectedColor,
            selected_size: item.selectedSize
        }));

        const result = await createOrder(orderData, orderItems);

        if (result.success) {
            clearCart();
            navigate('/order-success', { state: { orderId: result.id } });
        } else {
            alert('Order failed! Please try again.');
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Your bag is empty</h2>
                <Link to="/shop" className="bg-red-500 text-white px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest">
                    Go Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <Link to="/shop" className="flex items-center text-zinc-400 hover:text-red-500 font-black uppercase tracking-widest text-[10px] mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Shop
                </Link>

                <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-zinc-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <Truck className="text-red-500" />
                                <h2 className="font-black uppercase tracking-widest text-sm">Shipping Details</h2>
                            </div>
                            <div className="space-y-4">
                                <input
                                    name="email"
                                    placeholder="Email Address"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-white transition-all"
                                />
                                <input
                                    name="fullName"
                                    placeholder="Full Name"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-white transition-all"
                                />
                                <input
                                    name="address"
                                    placeholder="Street Address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-white transition-all"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        name="city"
                                        placeholder="City"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-white transition-all"
                                    />
                                    <input
                                        name="zipCode"
                                        placeholder="ZIP Code"
                                        required
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-white transition-all"
                                    />
                                </div>
                                <input
                                    name="country"
                                    placeholder="Country"
                                    required
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-zinc-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <CreditCard className="text-zinc-900" />
                                <h2 className="font-black uppercase tracking-widest text-sm">Payment</h2>
                            </div>
                            <div className="space-y-4">
                                <input
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    required
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-zinc-900 hover:bg-white transition-all"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        name="expiry"
                                        placeholder="MM/YY"
                                        required
                                        value={formData.expiry}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-zinc-900 hover:bg-white transition-all"
                                    />
                                    <input
                                        name="cvc"
                                        placeholder="CVC"
                                        required
                                        value={formData.cvc}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-zinc-900 hover:bg-white transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-red-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-zinc-900 transition-all shadow-xl shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isProcessing ? 'Processing...' : `Pay $${cartTotal}`}
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-[32px] h-fit sticky top-12 shadow-sm border border-zinc-100">
                        <h2 className="font-black uppercase tracking-widest text-sm mb-6">Order Summary</h2>
                        <div className="space-y-6 mb-6">
                            {items.map((item, idx) => (
                                <div key={`${item.id}-${idx}`} className="flex gap-4">
                                    <div className="w-16 h-16 bg-zinc-50 rounded-xl p-2 flex items-center justify-center shrink-0">
                                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xs uppercase leading-tight">{item.name}</h3>
                                        <p className="text-[10px] text-zinc-500 font-bold mt-1">
                                            Qty: {item.quantity}
                                            {item.selectedColor && ` • ${item.selectedColor}`}
                                            {item.selectedSize && ` • ${item.selectedSize}`}
                                        </p>
                                        <p className="font-black text-xs mt-1">${item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-zinc-100 flex justify-between items-center">
                            <span className="font-black uppercase tracking-widest text-xs text-zinc-400">Total</span>
                            <span className="font-black text-2xl text-zinc-900">${cartTotal}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
