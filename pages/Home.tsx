
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Headphones, CreditCard, ChevronRight, ChevronLeft, ArrowUpRight, ShoppingBag, Zap } from 'lucide-react';
import { getProducts } from '../services/dataService';
import { Product } from '../types';
import Logo from '../components/Logo';

const Home: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getProducts();
      setAllProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const bestSellers = useMemo(() => allProducts.filter(p => p.isBestSeller), [allProducts]);
  const featuredItems = useMemo(() => allProducts.slice(0, 8), [allProducts]);

  const nextSlide = () => {
    if (isAnimating || bestSellers.length === 0) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % bestSellers.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prevSlide = () => {
    if (isAnimating || bestSellers.length === 0) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + bestSellers.length) % bestSellers.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    if (bestSellers.length === 0) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [activeIndex, bestSellers]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <Logo height={40} className="text-zinc-900 animate-pulse mb-4" />
        <div className="w-12 h-0.5 bg-zinc-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-red-500 animate-[loading_1s_infinite_ease-in-out]" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-[#f5f5f5] min-h-[400px] flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center py-10 gap-8">
          <div className="z-20">
            <div className="flex items-center space-x-2 mb-4">
              <Zap size={14} className="text-red-500 fill-red-500" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-red-500">Premium Beats</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[0.9] mb-6 uppercase">
              WIRELESS<br />
              <span className="text-white [-webkit-text-stroke:2px_#111] drop-shadow-xl">TECH</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="bg-red-500 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-zinc-900 transition-all hover:-translate-y-1 shadow-2xl shadow-red-500/20">
                Explore Shop
              </Link>
              <button className="bg-white text-zinc-900 px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs border border-zinc-200 hover:bg-zinc-50 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative flex justify-center z-10 group">
            <div className="absolute inset-0 bg-red-500/10 rounded-full blur-[100px] scale-150 group-hover:bg-blue-500/10 transition-colors duration-1000" />
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000"
              alt="Hero"
              className="w-full max-w-[400px] h-auto object-contain transform -rotate-12 group-hover:rotate-0 transition-transform duration-1000 drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <div className="bg-zinc-900 py-8 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-12">
              <span className="text-white text-4xl font-black uppercase tracking-tighter opacity-20 hover:opacity-100 transition-opacity cursor-default">LOOP</span>
              <div className="w-4 h-4 rounded-full bg-red-500 mx-12 opacity-50" />
              <span className="text-white text-4xl font-black uppercase tracking-tighter opacity-20 hover:opacity-100 transition-opacity cursor-default">INVENTORY</span>
              <div className="w-4 h-4 rounded-full bg-blue-500 mx-12 opacity-50" />
              <span className="text-white text-4xl font-black uppercase tracking-tighter opacity-20 hover:opacity-100 transition-opacity cursor-default">EFFORTLESS</span>
              <div className="w-4 h-4 rounded-full bg-yellow-400 mx-12 opacity-50" />
            </div>
          ))}
        </div>
      </div>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 h-[450px] bg-zinc-900 rounded-[50px] p-12 flex flex-col justify-end relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <p className="text-zinc-400 font-bold text-xs uppercase mb-2 tracking-widest">Enjoy With</p>
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-6">Earphone</h3>
              <Link to="/shop?category=earphones" className="bg-red-500 text-white px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block transition-all group-hover:px-14">Browse</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=500" className="absolute top-0 -right-12 w-80 h-80 object-contain transform translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:-translate-y-12 transition-transform duration-1000" />
          </div>

          <div className="lg:col-span-1 h-[450px] bg-yellow-400 rounded-[50px] p-12 flex flex-col justify-end relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <p className="text-zinc-900/50 font-bold text-xs uppercase mb-2 tracking-widest">New Wearable</p>
              <h3 className="text-4xl font-black text-zinc-900 uppercase tracking-tighter mb-6">Gadget</h3>
              <Link to="/shop?category=wearables" className="bg-zinc-900 text-white px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block transition-all group-hover:px-14">Browse</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500" className="absolute top-0 -right-12 w-80 h-80 object-contain transform translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:-translate-y-12 transition-transform duration-1000" />
          </div>

          <div className="lg:col-span-2 h-[450px] bg-red-500 rounded-[50px] p-16 flex flex-col justify-center relative overflow-hidden group shadow-2xl">
            <div className="relative z-10 max-w-xs">
              <p className="text-white/70 font-bold text-xs uppercase mb-2 tracking-widest">Trend Devices</p>
              <h3 className="text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">Laptop</h3>
              <Link to="/shop?category=laptops" className="bg-white text-red-500 px-12 py-4 rounded-full text-[11px] font-black uppercase tracking-widest inline-block transition-all hover:bg-zinc-900 hover:text-white">Browse Collection</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800" className="absolute top-0 right-0 h-full w-[75%] object-contain transform translate-x-16 group-hover:translate-x-4 transition-transform duration-1000" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-zinc-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { Icon: Truck, label: 'Free Shipping', sub: 'On All Orders' },
            { Icon: ShieldCheck, label: 'Quality Verified', sub: 'Hand-picked gear' },
            { Icon: Headphones, label: 'Loop Concierge', sub: '24/7 Expert Help' },
            { Icon: CreditCard, label: 'Secure Vault', sub: 'Safe Payments' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-white rounded-3xl shadow-sm">
                <item.Icon className="text-red-500" size={28} strokeWidth={2.5} />
              </div>
              <h5 className="font-black text-sm uppercase tracking-tighter mb-1">{item.label}</h5>
              <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Wheel Section (Best Sellers) */}
      <section className="max-w-7xl mx-auto px-6 py-32 overflow-visible relative">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4">Curated Excellence</span>
          <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">Best Sellers</h2>
          <div className="w-20 h-1 bg-zinc-900 mt-2" />
        </div>

        <div className="relative min-h-[700px] w-full max-w-6xl mx-auto flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-white shadow-2xl p-6 rounded-full hover:bg-red-500 hover:text-white transition-all text-zinc-900 active:scale-90"
          >
            <ChevronLeft size={32} strokeWidth={3} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-white shadow-2xl p-6 rounded-full hover:bg-red-500 hover:text-white transition-all text-zinc-900 active:scale-90"
          >
            <ChevronRight size={32} strokeWidth={3} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            {bestSellers.map((product, index) => {
              let offset = index - activeIndex;
              const len = bestSellers.length;
              if (offset < -Math.floor(len / 2)) offset += len;
              if (offset > Math.floor(len / 2)) offset -= len;

              const isFocused = offset === 0;
              const isSide = Math.abs(offset) === 1;
              const spacing = window.innerWidth < 768 ? 260 : 420;
              const opacity = isFocused ? 1 : (isSide ? 0.3 : 0);
              const scale = isFocused ? 1.15 : (isSide ? 0.7 : 0.4);
              const blur = isFocused ? 'blur(0px)' : 'blur(12px)';

              return (
                <div
                  key={product.id}
                  className="absolute transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col items-center w-[300px]"
                  style={{
                    left: '50%',
                    marginLeft: '-150px',
                    transform: `translateX(${offset * spacing}px) scale(${scale})`,
                    zIndex: isFocused ? 30 : (isSide ? 10 : 0),
                    opacity: opacity,
                    filter: blur,
                    pointerEvents: isFocused ? 'auto' : 'none',
                  }}
                >
                  <div className={`bg-white rounded-[70px] overflow-hidden aspect-square flex items-center justify-center p-10 mb-6 transition-all duration-700 ${isFocused ? 'shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] border-4 border-zinc-50' : 'shadow-none'}`}>
                    <img
                      src={product.image}
                      className={`w-full h-full object-contain transition-transform duration-1000 ${isFocused ? 'scale-105 rotate-3' : 'scale-100'}`}
                      alt={product.name}
                    />
                  </div>

                  <div className={`text-center transition-all duration-700 delay-100 w-full ${isFocused ? 'translate-y-0 opacity-100 visible' : 'translate-y-12 opacity-0 invisible'}`}>
                    <p className="text-red-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2">Elite Choice</p>
                    <h3 className="font-black uppercase tracking-tighter text-3xl mb-2 text-zinc-900 leading-none px-4">{product.name}</h3>
                    <p className="text-zinc-400 font-bold text-2xl mb-6 tracking-tighter">${product.price}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-red-500 transition-all hover:scale-110 active:scale-95 shadow-xl shadow-zinc-900/10"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-24">
          {bestSellers.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-3 rounded-full transition-all duration-700 ${activeIndex === i ? 'w-20 bg-red-500 shadow-xl shadow-red-500/20' : 'w-3 bg-zinc-100 hover:bg-zinc-200'}`}
            />
          ))}
        </div>
      </section>

      {/* Latest Drops Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-zinc-50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">New Arrivals</span>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4">Latest Drops</h2>
            <p className="text-zinc-400 font-medium text-sm">Experience the cutting edge of tech lifestyle. Fresh inventory updated weekly from the world's most innovative labs.</p>
          </div>
          <Link to="/shop" className="bg-zinc-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] flex items-center group shadow-xl hover:bg-red-500 transition-all">
            Full Catalog <ChevronRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
          {featuredItems.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group relative flex flex-col h-full"
            >
              <div className="bg-zinc-900 rounded-[32px] overflow-hidden flex flex-col h-full shadow-2xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] transition-all duration-700 group-hover:-translate-y-4">
                <div className="relative aspect-square flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-[32px] m-4 p-8 overflow-hidden">
                  <img
                    src={product.image}
                    className="w-full h-full object-contain relative z-10 transform group-hover:scale-115 group-hover:rotate-6 transition-transform duration-1000"
                    alt={product.name}
                  />
                  <div className="absolute inset-0 bg-zinc-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-md z-30">
                    <div className="bg-white p-5 rounded-full text-zinc-900 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </div>

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
      </section>

      {/* Sale Banner */}
      <section className="max-w-7xl mx-auto px-6 py-20 mb-24">
        <div className="bg-red-500 rounded-[70px] p-16 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between text-white shadow-[0_50px_100px_-20px_rgba(239,68,68,0.3)]">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] border-[50px] border-white rounded-full" />
          </div>

          <div className="relative z-10 text-center lg:text-left">
            <p className="text-2xl font-black opacity-90 mb-4 tracking-tighter uppercase">Flash Velocity Sale</p>
            <h2 className="text-7xl lg:text-[140px] font-black uppercase tracking-tighter leading-[0.8] mb-12">
              SONIC<br />PEAK
            </h2>
            <div className="inline-flex items-center space-x-3 bg-zinc-900/20 px-6 py-3 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <p className="text-xs font-black tracking-[0.3em] uppercase">Offer Ends Dec 31st</p>
            </div>
          </div>

          <div className="relative h-[300px] lg:h-[500px] w-full lg:w-1/3 flex items-center justify-center my-16 lg:my-0">
            <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800" className="w-[150%] h-auto object-contain transform -rotate-12 drop-shadow-2xl z-20" />
          </div>

          <div className="relative z-10 text-center lg:text-left max-w-sm">
            <p className="text-xl font-bold opacity-80 mb-4">Elite Audio Gear</p>
            <h3 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-10 leading-none">SUMMER<br />FINALE</h3>
            <Link to="/shop" className="bg-white text-red-500 px-16 py-5 rounded-full font-black uppercase tracking-widest text-[12px] hover:bg-zinc-900 hover:text-white transition-all shadow-2xl scale-110">
              Claim Discount
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-50 py-32 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="flex flex-col">
            <Link to="/" className="mb-10 hover:opacity-80 transition-opacity">
              <Logo height={45} className="text-zinc-900" />
            </Link>
            <p className="text-zinc-900 text-[11px] font-black uppercase tracking-[0.4em] mb-8">
              Endless Shopping.<br />Effortless Style.
            </p>
            <p className="text-zinc-400 text-xs leading-loose max-w-xs font-medium">
              We curate the intersection of high-fidelity technology and modern architectural aesthetics. Quality is our only constant.
            </p>
          </div>
          <div>
            <h4 className="font-black uppercase text-xs tracking-[0.3em] mb-10 text-zinc-900">Digital Archive</h4>
            <ul className="space-y-6 text-zinc-500 text-[11px] font-bold uppercase tracking-widest">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Home Studio</Link></li>
              <li><Link to="/shop" className="hover:text-red-500 transition-colors">Full Catalog</Link></li>
              <li><Link to="/admin" className="hover:text-red-500 transition-colors">System Admin</Link></li>
              <li><button className="hover:text-red-500 transition-colors">Press Release</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-xs tracking-[0.3em] mb-10 text-zinc-900">Direct Link</h4>
            <ul className="space-y-4 text-zinc-400 text-xs leading-loose font-medium">
              <li>HQ: 123 Phlox Avenue</li>
              <li>Phone: +1 (800) LOOP-NOW</li>
              <li>Support: vault@loop.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-xs tracking-[0.3em] mb-10 text-zinc-900">The Loop List</h4>
            <div className="relative group">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-white border border-zinc-200 rounded-full py-5 px-8 text-xs font-black tracking-widest focus:ring-2 focus:ring-red-500 transition-all group-hover:border-zinc-400 outline-none"
              />
              <button className="absolute right-2 top-2 bg-zinc-900 text-white p-3 rounded-full hover:bg-red-500 transition-colors shadow-lg">
                <ChevronRight size={20} />
              </button>
            </div>
            <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest mt-6">Secure subscription enabled</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
