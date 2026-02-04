
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Star, Heart, Share2, Truck, RefreshCcw, Package, Ruler, Weight, Check, Shield, Clock, MapPin, Users, ThumbsUp } from 'lucide-react';
import { getProductById, getProducts } from '../services/dataService';
import { Product } from '../types';
import ChatBot from '../components/ChatBot';
import { useCart } from '../contexts/CartContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const foundProduct = await getProductById(id);
        setProduct(foundProduct);
        if (foundProduct?.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0].name);
        }
        if (foundProduct?.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
      }
    };
    const loadAllProducts = async () => {
      const products = await getProducts();
      setAllProducts(products);
    };
    loadProduct();
    loadAllProducts();
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-gray-400 text-xs">Loading LOOP Item...</div>;

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const stockStatus = product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock';
  const stockColor = product.stock > 10 ? 'text-green-500' : product.stock > 0 ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Link to="/shop" className="inline-flex items-center space-x-2 text-gray-400 hover:text-red-500 font-black uppercase tracking-widest text-[9px] mb-8 transition-colors group">
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to catalog</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="bg-gray-50 rounded-[48px] p-10 lg:p-16 aspect-square flex items-center justify-center sticky top-8">
            <img src={product.image} className="w-full h-full max-w-[400px] object-contain transform hover:scale-105 transition-transform duration-700" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">4.8 (127 Reviews)</span>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Share2 size={18} />
              </button>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{product.name}</h1>

            <div className="flex items-baseline space-x-4 mb-6">
              <p className="text-3xl font-black text-red-500">${product.price}</p>
              <span className={`text-xs font-black uppercase tracking-widest ${stockColor}`}>● {stockStatus}</span>
            </div>

            <div className="mb-8">
              <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-3">Item Details</h4>
              <p className="text-gray-500 leading-relaxed font-medium text-xs lg:text-sm">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-3">
                  Color: <span className="text-black">{selectedColor}</span>
                </h4>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`group relative w-12 h-12 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-red-500 scale-110' : 'border-gray-200 hover:border-gray-400'
                        }`}
                      title={color.name}
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check size={16} className="text-white drop-shadow-lg" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 1 && (
              <div className="mb-6">
                <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-3">
                  Size: <span className="text-black">{selectedSize}</span>
                </h4>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-3 rounded-full border-2 font-black text-xs uppercase tracking-wider transition-all ${selectedSize === size
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8 bg-gray-50 rounded-[24px] p-6">
                <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-4">Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check size={14} className="text-red-500 mt-0.5 shrink-0" strokeWidth={3} />
                      <span className="text-xs text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {(product.weight || product.dimensions || product.material || product.shape) && (
              <div className="mb-8">
                <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-4">Specifications</h4>
                <div className="grid grid-cols-2 gap-4">
                  {product.weight && (
                    <div className="border border-gray-100 p-4 rounded-[20px]">
                      <div className="flex items-center space-x-2 mb-2">
                        <Weight size={16} className="text-red-500" />
                        <h5 className="font-black uppercase text-[9px] tracking-widest text-gray-400">Weight</h5>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{product.weight}</p>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="border border-gray-100 p-4 rounded-[20px]">
                      <div className="flex items-center space-x-2 mb-2">
                        <Ruler size={16} className="text-blue-500" />
                        <h5 className="font-black uppercase text-[9px] tracking-widest text-gray-400">Dimensions</h5>
                      </div>
                      <p className="text-[10px] font-bold text-gray-900">
                        {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth}
                      </p>
                    </div>
                  )}
                  {product.material && (
                    <div className="border border-gray-100 p-4 rounded-[20px] col-span-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Package size={16} className="text-green-500" />
                        <h5 className="font-black uppercase text-[9px] tracking-widest text-gray-400">Material</h5>
                      </div>
                      <p className="text-xs font-medium text-gray-700">{product.material}</p>
                    </div>
                  )}
                  {product.shape && (
                    <div className="border border-gray-100 p-4 rounded-[20px] col-span-2">
                      <h5 className="font-black uppercase text-[9px] tracking-widest text-gray-400 mb-2">Form Factor</h5>
                      <p className="text-xs font-medium text-gray-700">{product.shape}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Delivery & Warranty Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="border border-gray-100 p-5 rounded-[24px] flex items-center space-x-4">
                <Truck className="text-red-500 shrink-0" size={24} />
                <div>
                  <h5 className="font-black uppercase tracking-tighter text-[11px]">Free Shipping</h5>
                  <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">2-3 Days</p>
                </div>
              </div>
              <div className="border border-gray-100 p-5 rounded-[24px] flex items-center space-x-4">
                <RefreshCcw className="text-blue-500 shrink-0" size={24} />
                <div>
                  <h5 className="font-black uppercase tracking-tighter text-[11px]">30 Day Return</h5>
                  <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">No Hassle</p>
                </div>
              </div>
              <div className="border border-gray-100 p-5 rounded-[24px] flex items-center space-x-4">
                <Shield className="text-green-500 shrink-0" size={24} />
                <div>
                  <h5 className="font-black uppercase tracking-tighter text-[11px]">1 Year Warranty</h5>
                  <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Included</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 items-stretch sm:items-center">
              <div className="flex items-center bg-gray-50 rounded-full p-1.5 h-14 w-full sm:w-auto px-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center font-black text-base hover:text-red-500"
                >
                  -
                </button>
                <span className="px-6 font-black text-lg w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center font-black text-base hover:text-red-500"
                >
                  +
                </button>
              </div>

              <button
                className="flex-1 bg-red-500 hover:bg-zinc-900 text-white font-black uppercase tracking-widest h-14 rounded-full transition-all flex items-center justify-center space-x-3 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  if (product) {
                    addToCart(product, quantity, selectedColor, selectedSize);
                  }
                }}
                disabled={product.stock === 0}
              >
                <ShoppingBag size={18} />
                <span className="text-[10px]">{product.stock > 0 ? 'Add To Cart' : 'Out of Stock'}</span>
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${isWishlisted
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-gray-100 text-red-500 hover:bg-red-50'
                  }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Content Section */}
        <div className="mt-24 border-t border-gray-100 pt-16">
          <div className="flex space-x-8 border-b border-gray-100 mb-12">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'specs', label: 'Specifications' },
              { id: 'reviews', label: 'Reviews (127)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 font-black uppercase text-xs tracking-widest transition-all relative ${activeTab === tab.id
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
                )}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="prose prose-sm max-w-none">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Product Overview</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              {product.features && product.features.length > 0 && (
                <>
                  <h4 className="text-lg font-black uppercase tracking-tighter mb-4 mt-8">What's Included</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <Package size={16} className="text-red-500 mt-1 shrink-0" />
                      <span className="text-gray-600">1x {product.name}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Package size={16} className="text-red-500 mt-1 shrink-0" />
                      <span className="text-gray-600">USB-C Charging Cable</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Package size={16} className="text-red-500 mt-1 shrink-0" />
                      <span className="text-gray-600">Quick Start Guide</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Package size={16} className="text-red-500 mt-1 shrink-0" />
                      <span className="text-gray-600">Warranty Card</span>
                    </li>
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specs' && (
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.weight && (
                  <div className="flex justify-between py-4 border-b border-gray-100">
                    <span className="font-black uppercase text-xs tracking-widest text-gray-400">Weight</span>
                    <span className="font-bold text-sm text-gray-900">{product.weight}</span>
                  </div>
                )}
                {product.dimensions && (
                  <>
                    <div className="flex justify-between py-4 border-b border-gray-100">
                      <span className="font-black uppercase text-xs tracking-widest text-gray-400">Width</span>
                      <span className="font-bold text-sm text-gray-900">{product.dimensions.width}</span>
                    </div>
                    <div className="flex justify-between py-4 border-b border-gray-100">
                      <span className="font-black uppercase text-xs tracking-widest text-gray-400">Height</span>
                      <span className="font-bold text-sm text-gray-900">{product.dimensions.height}</span>
                    </div>
                    <div className="flex justify-between py-4 border-b border-gray-100">
                      <span className="font-black uppercase text-xs tracking-widest text-gray-400">Depth</span>
                      <span className="font-bold text-sm text-gray-900">{product.dimensions.depth}</span>
                    </div>
                  </>
                )}
                {product.material && (
                  <div className="flex justify-between py-4 border-b border-gray-100">
                    <span className="font-black uppercase text-xs tracking-widest text-gray-400">Material</span>
                    <span className="font-bold text-sm text-gray-900">{product.material}</span>
                  </div>
                )}
                {product.shape && (
                  <div className="flex justify-between py-4 border-b border-gray-100">
                    <span className="font-black uppercase text-xs tracking-widest text-gray-400">Form Factor</span>
                    <span className="font-bold text-sm text-gray-900">{product.shape}</span>
                  </div>
                )}
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="font-black uppercase text-xs tracking-widest text-gray-400">Warranty</span>
                  <span className="font-bold text-sm text-gray-900">1 Year</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="font-black uppercase text-xs tracking-widest text-gray-400">SKU</span>
                  <span className="font-bold text-sm text-gray-900">LOOP-{product.id}</span>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Customer Reviews</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <span className="text-sm font-bold text-gray-600">4.8 out of 5 (127 reviews)</span>
                  </div>
                </div>
                <button className="bg-red-500 text-white px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-zinc-900 transition-all">
                  Write Review
                </button>
              </div>

              <div className="space-y-8">
                {[
                  { name: 'Sarah Johnson', rating: 5, date: 'Jan 15, 2026', comment: 'Absolutely love this product! The quality is outstanding and it exceeded my expectations. Highly recommend!', verified: true },
                  { name: 'Mike Chen', rating: 5, date: 'Jan 10, 2026', comment: 'Best purchase I\'ve made this year. The build quality is exceptional and the performance is flawless.', verified: true },
                  { name: 'Emma Davis', rating: 4, date: 'Jan 5, 2026', comment: 'Great product overall. Shipping was fast and packaging was secure. Only minor issue is the price point.', verified: true }
                ].map((review, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-[24px] p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h5 className="font-black text-sm">{review.name}</h5>
                          {review.verified && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex text-yellow-400">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                          </div>
                          <span className="text-xs text-gray-400 font-bold">{review.date}</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <ThumbsUp size={16} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-gray-100 pt-16">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">You May Also Like</h3>
                <p className="text-gray-400 text-sm font-medium">Similar products in {product.category}</p>
              </div>
              <Link to={`/shop?category=${product.category}`} className="text-red-500 font-black uppercase text-xs tracking-widest hover:text-zinc-900 transition-colors flex items-center space-x-2">
                <span>View All</span>
                <ChevronLeft size={14} className="rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-[32px] p-6 mb-4 aspect-square flex items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                    <img
                      src={relatedProduct.image}
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                      alt={relatedProduct.name}
                    />
                  </div>
                  <h4 className="font-black uppercase text-sm tracking-tighter mb-2 group-hover:text-red-500 transition-colors">{relatedProduct.name}</h4>
                  <p className="text-lg font-black text-gray-900">${relatedProduct.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <ChatBot product={product} />
    </div>
  );
};

export default ProductDetails;
