import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { user, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-zinc-900">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-black uppercase tracking-widest text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && profile?.role !== 'admin') {
        return (
            <div className="h-screen flex items-center justify-center bg-zinc-900">
                <div className="text-center max-w-md px-6">
                    <h1 className="text-6xl font-black text-red-500 mb-4">403</h1>
                    <p className="text-white text-2xl font-black uppercase tracking-tighter mb-2">Access Denied</p>
                    <p className="text-zinc-400 mb-8">You don't have permission to access this page.</p>
                    <a href="/" className="bg-red-500 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all inline-block">
                        Go Home
                    </a>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
