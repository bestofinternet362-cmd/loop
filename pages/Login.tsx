import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, AlertCircle, Loader } from 'lucide-react';

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<'customer' | 'admin'>('customer');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignUp) {
                const { error } = await signUp(email, password, fullName, role);
                if (error) throw error;
                setError('Check your email to confirm your account!');
                setTimeout(() => {
                    setIsSignUp(false);
                    setError('');
                }, 3000);
            } else {
                const { error } = await signIn(email, password);
                if (error) throw error;
                navigate(from, { replace: true });
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-6 py-12">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighter">LOOP</h1>
                        <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">E-Commerce</p>
                    </Link>
                </div>

                {/* Login Card */}
                <div className="bg-zinc-800 rounded-[32px] p-8 shadow-2xl">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-zinc-400 text-sm mb-8">
                        {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
                    </p>

                    {error && (
                        <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 ${error.includes('Check your email') ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
                            }`}>
                            <AlertCircle className={error.includes('Check your email') ? 'text-green-500' : 'text-red-500'} size={20} />
                            <p className={`text-sm ${error.includes('Check your email') ? 'text-green-400' : 'text-red-400'}`}>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isSignUp && (
                            <div>
                                <label className="block text-zinc-300 text-sm font-bold mb-2 uppercase tracking-wider">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-zinc-900 text-white pl-12 pr-4 py-3.5 rounded-2xl border border-zinc-700 focus:border-red-500 focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                        required={isSignUp}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-zinc-300 text-sm font-bold mb-2 uppercase tracking-wider">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-zinc-900 text-white pl-12 pr-4 py-3.5 rounded-2xl border border-zinc-700 focus:border-red-500 focus:outline-none transition-colors"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-zinc-300 text-sm font-bold mb-2 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-zinc-900 text-white pl-12 pr-4 py-3.5 rounded-2xl border border-zinc-700 focus:border-red-500 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {isSignUp && (
                            <div>
                                <label className="block text-zinc-300 text-sm font-bold mb-2 uppercase tracking-wider">
                                    Account Type
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setRole('customer')}
                                        className={`py-3 px-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all ${role === 'customer'
                                                ? 'bg-red-500 text-white'
                                                : 'bg-zinc-900 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                                            }`}
                                    >
                                        Customer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole('admin')}
                                        className={`py-3 px-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all ${role === 'admin'
                                                ? 'bg-red-500 text-white'
                                                : 'bg-zinc-900 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                                            }`}
                                    >
                                        Admin
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest text-sm py-4 rounded-2xl transition-all shadow-lg hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader className="animate-spin" size={20} />
                                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                                </>
                            ) : (
                                <>{isSignUp ? 'Create Account' : 'Sign In'}</>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError('');
                            }}
                            className="text-zinc-400 hover:text-white text-sm transition-colors"
                        >
                            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                            <span className="text-red-500 font-bold">{isSignUp ? 'Sign In' : 'Sign Up'}</span>
                        </button>
                    </div>
                </div>

                <p className="text-center text-zinc-600 text-xs mt-8">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default Login;
