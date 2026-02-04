
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, profile, signOut, isAdmin } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center transition-transform hover:scale-105 active:scale-95">
          <Logo height={28} className="text-zinc-900" />
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-zinc-900 transition-colors">Shop</Link>
          {isAdmin && (
            <Link to="/admin" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
              <Shield size={14} />
              Admin
            </Link>
          )}
          <button className="hover:text-zinc-900 transition-colors">About</button>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:bg-zinc-100 px-3 py-2 rounded-full transition-colors"
              >
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-black text-xs">
                  {getUserInitials()}
                </div>
                <span className="hidden md:block text-xs font-bold text-zinc-900">{profile?.full_name || user.email}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-zinc-100 py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-zinc-100">
                    <p className="text-sm font-bold text-zinc-900">{profile?.full_name || 'User'}</p>
                    <p className="text-xs text-zinc-500">{user.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-2 bg-red-500 text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                    >
                      <Shield size={16} />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-zinc-400 font-bold text-[10px] hidden md:block uppercase tracking-widest hover:text-zinc-900 transition-colors">
              Login
            </Link>
          )}

          <button onClick={() => navigate('/shop')} className="p-1.5 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
            <Search size={20} strokeWidth={2.5} />
          </button>
          <button className="p-1.5 text-zinc-900 relative hover:bg-zinc-100 rounded-full transition-colors">
            <ShoppingBag size={20} strokeWidth={2.5} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">2</span>
          </button>
          <button className="md:hidden p-1.5 text-zinc-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-zinc-100 p-8 flex flex-col space-y-6 shadow-2xl animate-in slide-in-from-top-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="font-black uppercase tracking-widest text-sm">Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)} className="font-black uppercase tracking-widest text-sm">Shop</Link>
          {isAdmin && (
            <Link to="/admin" onClick={() => setIsOpen(false)} className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
              <Shield size={16} />
              Admin
            </Link>
          )}
          {user ? (
            <button onClick={handleSignOut} className="font-black uppercase tracking-widest text-sm text-red-500 text-left">
              Sign Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="font-black uppercase tracking-widest text-sm">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
