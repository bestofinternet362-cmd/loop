
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ShoppingBag, ArrowUpRight, Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { getProducts } from '../services/dataService';
import { CATEGORIES } from '../constants';
import { Product, FilterState } from '../types';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'low' | 'high'>('featured');
  const location = useLocation();

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 4000
  });

  useEffect(() => {
    const loadProducts = async () => {
      // We clear localStorage to ensure new seed products are loaded if they were updated in constants
      // For a real app, we'd handle migration, but for this demo, it's safer to refresh.
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    loadProducts();
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setFilters(prev => ({ ...prev, category: cat }));
    window.scrollTo(0, 0);
  }, [location.search]);

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const searchLower = filters.search.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower);
      const matchCategory = filters.category === '' || p.category === filters.category;
      const matchPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      return matchSearch && matchCategory && matchPrice;
    });

    if (sortBy === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'featured') {
      filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return filtered;
  }, [products, filters, sortBy]);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Dynamic Catalog Header */}
      <section className="bg-zinc-900 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
            Digital<br /><span className="text-red-500">Inventory</span>
          </h1>
          <p className="text-zinc-400 font-bold text-xs uppercase tracking-[0.4em] mb-12">Precision Engineered Gadgets</p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 text-white text-sm font-bold focus:ring-2 focus:ring-red-500 focus:bg-white/10 transition-all backdrop-blur-md"
            />
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100 py-4 px-6 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center space-x-3 px-6 py-2.5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all ${isFilterOpen ? 'bg-zinc-900 text-white' : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'}`}
            >
              <Filter size={14} />
              <span>Filters</span>
            </button>
            <div className="h-4 w-[1px] bg-zinc-200 mx-2 hidden md:block" />
            <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest hidden md:block">
              {sortedAndFilteredProducts.length} Items Found
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-50 text-zinc-900 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest appearance-none pr-10 border-none focus:ring-1 focus:ring-zinc-200 cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="low">Sort: Price Low-High</option>
                <option value="high">Sort: Price High-Low</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Expanded Filters Drawer */}
        {isFilterOpen && (
          <div className="bg-zinc-50 rounded-[40px] p-8 md:p-12 mb-16 animate-in slide-in-from-top-4 grid grid-cols-1 lg:grid-cols-3 gap-12 border border-zinc-100 shadow-inner">
            <div className="lg:col-span-2">
              <h4 className="font-black uppercase tracking-widest text-[11px] text-zinc-400 mb-6 flex items-center">
                <LayoutGrid size={14} className="mr-2" />
                Browse Categories
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                  className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-center border ${filters.category === '' ? 'bg-zinc-900 text-white border-zinc-900 shadow-xl scale-105' : 'bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300'}`}
                >
                  All Tech
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilters(prev => ({ ...prev, category: cat.id }))}
                    className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-center border ${filters.category === cat.id ? 'bg-red-500 text-white border-red-500 shadow-xl scale-105' : 'bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm">
              <h4 className="font-black uppercase tracking-widest text-[11px] text-zinc-400 mb-8 flex items-center">
                <SlidersHorizontal size={14} className="mr-2" />
                Price Limit: ${filters.maxPrice}
              </h4>
              <input
                type="range" min="0" max="4000" step="50"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-red-500 mb-4"
              />
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-300">
                <span>$0</span>
                <span>$4,000+</span>
              </div>
              <button
                onClick={() => setFilters({ search: '', category: '', minPrice: 0, maxPrice: 4000 })}
                className="w-full mt-8 py-3 rounded-xl bg-zinc-50 text-zinc-400 text-[9px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {sortedAndFilteredProducts.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group relative flex flex-col h-full"
            >
              <div className="bg-zinc-900 rounded-[32px] overflow-hidden flex flex-col h-full shadow-2xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] transition-all duration-700 group-hover:-translate-y-3">
                {/* Image Section */}
                <div className="relative aspect-square flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-[32px] m-4 p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-zinc-50 opacity-50" />
                  <img
                    src={product.image}
                    className="w-full h-full object-contain relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-1000"
                    alt={product.name}
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2 z-20">
                    {product.isBestSeller && (
                      <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">Best Seller</span>
                    )}
                    {product.stock <= 5 && (
                      <span className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">Low Stock</span>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-zinc-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm z-30">
                    <div className="bg-white p-4 rounded-full text-zinc-900 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-grow flex flex-col p-6 pt-0">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 leading-tight group-hover:text-red-400 transition-colors">{product.name}</h3>
                  <p className="text-zinc-400 font-bold text-sm mb-4">${product.price}</p>

                  <button className="mt-auto bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest text-xs py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-red-500/50">
                    Buy Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {sortedAndFilteredProducts.length === 0 && (
          <div className="text-center py-40 bg-zinc-50 rounded-[60px] border-2 border-dashed border-zinc-100">
            <div className="max-w-xs mx-auto">
              <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={32} className="text-zinc-300" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 mb-3">No gadgets found</h3>
              <p className="text-zinc-400 text-xs font-bold leading-relaxed mb-8">We couldn't find any items matching your current filters in the Loop.</p>
              <button
                onClick={() => setFilters({ search: '', category: '', minPrice: 0, maxPrice: 4000 })}
                className="bg-zinc-900 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-xl"
              >
                Reset Catalog
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Featured Newsletter */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-red-500 rounded-[60px] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-6 h-full">
              {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white" />)}
            </div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">JOIN THE LOOP<br />COMMUNITY</h2>
            <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-12 max-w-lg mx-auto leading-relaxed">Get first access to limited edition drops, secret sales, and the future of tech.</p>
            <div className="max-w-md mx-auto relative">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="w-full bg-white border-none rounded-full py-5 px-8 text-zinc-900 font-black text-xs focus:ring-4 focus:ring-white/20 uppercase tracking-widest"
              />
              <button className="absolute right-1.5 top-1.5 bg-zinc-900 text-white px-8 py-3.5 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-zinc-800 transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
