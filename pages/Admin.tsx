import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Loader2, CloudUpload, Trash, Box, Palette, Ruler, FileText, Info } from 'lucide-react';
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

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'earphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    stock: 10,
    isBestSeller: false,
    colors: [],
    sizes: [],
    features: [],
    weight: '',
    material: '',
    shape: '',
    dimensions: { width: '', height: '', depth: '' }
  });

  // Temporary state for adding array items
  const [newColor, setNewColor] = useState({ name: '', hex: '#000000' });
  const [newSize, setNewSize] = useState('');
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    const data = await getProducts();
    setProducts(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product permanently?')) {
      setIsLoading(true);
      const updated = await deleteProduct(id);
      setProducts(updated);
      setIsLoading(false);
    }
  };

  const openModal = (p: Product | null) => {
    if (p) {
      setEditingProduct(p);
      setFormData({
        ...p,
        colors: p.colors || [],
        sizes: p.sizes || [],
        features: p.features || [],
        dimensions: p.dimensions || { width: '', height: '', depth: '' }
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'earphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
        stock: 10,
        isBestSeller: false,
        colors: [],
        sizes: [],
        features: [],
        weight: '',
        material: '',
        shape: '',
        dimensions: { width: '', height: '', depth: '' }
      });
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

  // Helper functions for array fields
  const addColor = () => {
    if (newColor.name) {
      setFormData({ ...formData, colors: [...(formData.colors || []), newColor] });
      setNewColor({ name: '', hex: '#000000' });
    }
  };

  const removeColor = (index: number) => {
    setFormData({ ...formData, colors: formData.colors?.filter((_, i) => i !== index) });
  };

  const addSize = () => {
    if (newSize) {
      setFormData({ ...formData, sizes: [...(formData.sizes || []), newSize] });
      setNewSize('');
    }
  };

  const removeSize = (index: number) => {
    setFormData({ ...formData, sizes: formData.sizes?.filter((_, i) => i !== index) });
  };

  const addFeature = () => {
    if (newFeature) {
      setFormData({ ...formData, features: [...(formData.features || []), newFeature] });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features?.filter((_, i) => i !== index) });
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
            {isLoading ? (
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
                            <img src={p.image} className="max-w-full max-h-full object-contain" alt={p.name} />
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
          <div className="bg-white w-full max-w-4xl rounded-[50px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/10">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">{editingProduct ? 'Modify Asset' : 'New Catalog Entry'}</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Advanced Product Configuration</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-100 p-3 rounded-full hover:bg-red-500 hover:text-white transition-colors"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-4 flex items-center gap-2">
                    <Info size={14} className="text-red-500" /> Basic Information
                  </h3>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">Product Name</label>
                  <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">Category</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">Description</label>
                  <textarea rows={3} required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200" />

              {/* Pricing & Stock */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="col-span-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-4 flex items-center gap-2">
                    <Box size={14} className="text-red-500" /> Inventory Data
                  </h3>
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">Price ($)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">Stock Qty</label>
                  <input type="number" required value={formData.stock} onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div className="col-span-2 flex items-end">
                  <label className="flex items-center space-x-3 cursor-pointer bg-gray-50 px-5 py-3 rounded-2xl w-full border border-zinc-100">
                    <input type="checkbox" checked={formData.isBestSeller} onChange={e => setFormData({ ...formData, isBestSeller: e.target.checked })} className="w-5 h-5 text-red-500 rounded focus:ring-red-500 border-gray-300" />
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-900">Mark as Best Seller</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200" />

              {/* Specifications */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-4 flex items-center gap-2">
                  <Ruler size={14} className="text-red-500" /> Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">Weight</label>
                    <input placeholder="e.g. 215g" value={formData.weight || ''} onChange={e => setFormData({ ...formData, weight: e.target.value })} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">Material</label>
                    <input placeholder="e.g. Aluminum" value={formData.material || ''} onChange={e => setFormData({ ...formData, material: e.target.value })} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">Shape</label>
                    <input placeholder="e.g. Cylindrical" value={formData.shape || ''} onChange={e => setFormData({ ...formData, shape: e.target.value })} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">Dimensions</label>
                  </div>
                  <input placeholder="Width (e.g. 10cm)" value={formData.dimensions?.width || ''} onChange={e => setFormData({ ...formData, dimensions: { ...formData.dimensions, width: e.target.value } })} className="bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" />
                  <input placeholder="Height (e.g. 20cm)" value={formData.dimensions?.height || ''} onChange={e => setFormData({ ...formData, dimensions: { ...formData.dimensions, height: e.target.value } })} className="bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" />
                  <input placeholder="Depth (e.g. 5cm)" value={formData.dimensions?.depth || ''} onChange={e => setFormData({ ...formData, dimensions: { ...formData.dimensions, depth: e.target.value } })} className="bg-gray-50 border border-zinc-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200" />

              {/* Variants: Colors & Sizes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Colors */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-4 flex items-center gap-2">
                    <Palette size={14} className="text-red-500" /> Colors
                  </h3>
                  <div className="flex gap-2 mb-4">
                    <input
                      placeholder="Color Name"
                      value={newColor.name}
                      onChange={e => setNewColor({ ...newColor, name: e.target.value })}
                      className="flex-1 bg-gray-50 border border-zinc-100 rounded-xl py-2 px-4 text-xs font-bold focus:ring-2 focus:ring-red-500 outline-none"
                    />
                    <div className="flex items-center gap-2 bg-gray-50 border border-zinc-100 rounded-xl px-2">
                      <input
                        type="color"
                        value={newColor.hex}
                        onChange={e => setNewColor({ ...newColor, hex: e.target.value })}
                        className="w-6 h-6 rounded cursor-pointer border-none bg-transparent"
                      />
                    </div>
                    <button type="button" onClick={addColor} className="bg-zinc-900 text-white p-2 rounded-xl hover:bg-red-500 transition-colors"><Plus size={16} /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.colors?.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg pl-2 pr-1 py-1 shadow-sm">
                        <div className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: c.hex }} />
                        <span className="text-[10px] font-bold uppercase">{c.name}</span>
                        <button type="button" onClick={() => removeColor(i)} className="text-gray-400 hover:text-red-500"><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-4 flex items-center gap-2">
                    <Box size={14} className="text-red-500" /> Sizes
                  </h3>
                  <div className="flex gap-2 mb-4">
                    <input
                      placeholder="Add Size (e.g. XL, 14-inch)"
                      value={newSize}
                      onChange={e => setNewSize(e.target.value)}
                      className="flex-1 bg-gray-50 border border-zinc-100 rounded-xl py-2 px-4 text-xs font-bold focus:ring-2 focus:ring-red-500 outline-none"
                    />
                    <button type="button" onClick={addSize} className="bg-zinc-900 text-white p-2 rounded-xl hover:bg-red-500 transition-colors"><Plus size={16} /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.sizes?.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg pl-3 pr-1 py-1 shadow-sm">
                        <span className="text-[10px] font-bold uppercase">{s}</span>
                        <button type="button" onClick={() => removeSize(i)} className="text-gray-400 hover:text-red-500"><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200" />

              {/* Features */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-4 flex items-center gap-2">
                  <FileText size={14} className="text-red-500" /> Key Features
                </h3>
                <div className="flex gap-2 mb-4">
                  <input
                    placeholder="Add a key feature..."
                    value={newFeature}
                    onChange={e => setNewFeature(e.target.value)}
                    className="flex-1 bg-gray-50 border border-zinc-100 rounded-xl py-2 px-4 text-xs font-bold focus:ring-2 focus:ring-red-500 outline-none"
                  />
                  <button type="button" onClick={addFeature} className="bg-zinc-900 text-white p-2 rounded-xl hover:bg-red-500 transition-colors"><Plus size={16} /></button>
                </div>
                <div className="space-y-2">
                  {formData.features?.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm group">
                      <span className="text-xs font-medium text-zinc-600">{f}</span>
                      <button type="button" onClick={() => removeFeature(i)} className="text-gray-300 group-hover:text-red-500"><Trash size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Image URL</label>
                <input required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full bg-gray-50 border border-zinc-100 rounded-2xl py-4 px-6 text-[11px] font-mono focus:ring-2 focus:ring-red-500 outline-none transition-all" />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-red-500 text-white py-6 rounded-[30px] font-black uppercase tracking-widest text-[12px] hover:bg-zinc-900 transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-red-500/20 disabled:bg-gray-400 mt-8"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <CloudUpload size={20} />}
                <span>{isSaving ? 'Syncing to Cloud...' : 'Save Product Asset'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
