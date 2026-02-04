
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';

const OrderSuccess: React.FC = () => {
    const location = useLocation();
    const orderId = location.state?.orderId || 'Unknown';

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[40px] p-10 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />

                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
                    <CheckCircle size={40} className="text-green-500" strokeWidth={3} />
                </div>

                <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 text-zinc-900">Order Confirmed!</h1>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Thank you for your purchase. Your order has been secured in the Loop.
                </p>

                <div className="bg-zinc-50 rounded-2xl p-4 mb-8 border border-zinc-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Order ID</p>
                    <p className="font-mono text-sm font-bold text-zinc-900 select-all">{orderId}</p>
                </div>

                <Link
                    to="/shop"
                    className="w-full bg-zinc-900 text-white py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    <ShoppingBag size={16} />
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
