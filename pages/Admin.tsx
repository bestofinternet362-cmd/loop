
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Loader2, CloudUpload } from 'lucide-react';
import { getProducts, saveProduct, deleteProduct } from '../services/dataService';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'earphones',
    image: 'https://picsum.photos/400',
    stock: 10,
    isBestSeller: false
  });

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product permanently from the cloud?')) {
      setIsLoading(true);
      const updated = await deleteProduct(id);
      setProducts(updated);
      setIsLoading(false);
    }
  };

  const openModal = (p: Product | null) => {
    if (p) {
      setEditingProduct(p);
      setFormData(p);
    } else {
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: 0, category: 'earphones', image: 'https://picsum.photos/400', stock: 10, isBestSeller: false });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const product = { ...formData, id: editingProduct?.id || Date.now().toString() } as Product;
    const updated = await saveProduct(product);
    setProducts(updated);
    setIsSaving(false);
    setIsModalOpen(false);
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <CloudUpload size={20} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Cloud Connected</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-1">LOOP INVENTORY</h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Live Database Management</p>
          </div>
          <button 
            onClick={() => openModal(null)}
            className="bg-red-500 text-white px-12 py-4 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-zinc-900 transition-all flex items-center space-x-3 shadow-2xl shadow-red-500/20"
          >
            <Plus size={18} />
            <span>New Inventory Item</span>
          </button>
        </div>

        <div className="bg-white rounded-[40px] shadow-sm overflow-hidden border border-gray-100">
          <div className="p-8 border-b border-gray-50 bg-gray-50/20">
            <div className="relative max-w-md">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Database..." 
                className="w-full bg-white border border-gray-100 rounded-full py-4 pl-14 pr-8 text-xs font-bold shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading && !isSaving ? (
              <div className="p-20 flex flex-col items-center justify-center text-gray-300">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p className="text-[10px] font-black uppercase tracking-widest">Fetching Loop Cloud...</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-gray-50">
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product Concept</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">In Stock</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Retail Value</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(p => (
                    <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-100 p-2 shadow-sm flex items-center justify-center">
                            <img src={p.image} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div>
                            <p className="font-black uppercase tracking-tighter text-sm group-hover:text-red-500 transition-colors leading-none mb-1">{p.name}</p>
                            <p className="text-[9px] text-gray-400 font-mono tracking-tighter">ID: {p.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="bg-zinc-100 text-zinc-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-zinc-200">{p.category}</span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span className={`font-black text-sm ${p.stock <= 5 ? 'text-amber-500' : 'text-zinc-900'}`}>{p.stock}</span>
                      </td>
                      <td className="px-10 py-6 text-right font-black text-zinc-900 text-lg tracking-tighter">${p.price}</td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex justify-end space-x-3">
                          <button onClick={() => openModal(p)} className="p-3 bg-zinc-50 rounded-2xl hover:bg-zinc-900 hover:text-white transition-all text-zinc-400 shadow-sm"><Edit2 size={14} /></button>
                          <button onClick={() => handleDelete(p.id)} className="p-3 bg-zinc-50 rounded-2xl hover:bg-red-500 hover:text-white transition-all text-zinc-400 shadow-sm"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zinc-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[50px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] border border-white/20">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/10">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">{editingProduct ? 'Modify Asset' : 'New Catalog Entry'}</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Populating Loop Cloud Instance</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-100 p-3 rounded-full hover:bg-red-500 hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Product Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none appearance-none">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Retail Price ($)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Product Narrative</label>
                <textarea rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-4 px-6 text-sm font-bold leading-relaxed focus:ring-2 focus:ring-red-500 outline-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-8 items-center">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Inventory Quantity</label>
                  <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none transition-all" />
                </div>
                <div className="flex items-center pt-8">
                  <label className="flex items-center space-x-4 cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" checked={formData.isBestSeller} onChange={e => setFormData({...formData, isBestSeller: e.target.checked})} className="sr-only" />
                      <div className={`w-12 h-6 rounded-full transition-colors ${formData.isBestSeller ? 'bg-red-500' : 'bg-gray-200'}`} />
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isBestSeller ? 'translate-x-6' : ''}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Featured Best Seller</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Visual Asset URL</label>
                <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-4 px-6 text-[11px] font-mono focus:ring-2 focus:ring-red-500 outline-none transition-all" />
              </div>
              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full bg-red-500 text-white py-6 rounded-[30px] font-black uppercase tracking-widest text-[12px] hover:bg-zinc-900 transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-red-500/20 disabled:bg-gray-400"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <CloudUpload size={20} />}
                <span>{isSaving ? 'Syncing with Cloud...' : 'Commit Database Entry'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
