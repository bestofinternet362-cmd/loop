
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'earphones', name: 'Earphone', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400', color: 'bg-zinc-900', tagline: 'Enjoy With' },
  { id: 'wearables', name: 'Gadget', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400', color: 'bg-yellow-400', tagline: 'New Wearable' },
  { id: 'laptops', name: 'Laptop', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400', color: 'bg-red-500', tagline: 'Trend Devices' },
  { id: 'consoles', name: 'Console', image: 'https://images.unsplash.com/photo-1485842295075-08819543f490?q=80&w=400', color: 'bg-zinc-100', tagline: 'Best Gaming' },
  { id: 'oculus', name: 'Oculus', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=400', color: 'bg-green-500', tagline: 'Play Game' },
  { id: 'speakers', name: 'Speaker', image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=400', color: 'bg-blue-500', tagline: 'Now Amazon' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Beats Solo Wireless',
    description: 'High-performance wireless noise cancelling headphones with the Apple W1 chip and Class 1 Bluetooth connectivity.',
    price: 199,
    category: 'earphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    isBestSeller: true,
    stock: 12,
    colors: [
      { name: 'Matte Black', hex: '#1a1a1a' },
      { name: 'Rose Gold', hex: '#b76e79' },
      { name: 'Silver', hex: '#c0c0c0' },
      { name: 'Red', hex: '#e74c3c' }
    ],
    sizes: ['One Size'],
    weight: '215g',
    dimensions: { width: '17.8cm', height: '18.5cm', depth: '7.6cm' },
    material: 'Premium plastic and metal frame with soft ear cushions',
    features: [
      'Up to 40 hours of battery life',
      'Apple W1 chip for seamless connectivity',
      'Active Noise Cancelling (ANC)',
      'Spatial audio with dynamic head tracking',
      'Fast Fuel charging - 10 min charge = 3 hours playback'
    ],
    shape: 'Over-ear headband design'
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation and 30-hour battery life for the ultimate listening experience.',
    price: 349,
    category: 'earphones',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800',
    isBestSeller: false,
    stock: 8
  },
  {
    id: '3',
    name: 'MacBook Pro M3 Max',
    description: 'The most powerful laptop for pros. Featuring the M3 Max chip and a stunning Liquid Retina XDR display.',
    price: 3499,
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800',
    isBestSeller: true,
    stock: 3,
    colors: [
      { name: 'Space Black', hex: '#2d2d2d' },
      { name: 'Silver', hex: '#e8e8e8' }
    ],
    sizes: ['14-inch', '16-inch'],
    weight: '2.15kg',
    dimensions: { width: '35.57cm', height: '1.55cm', depth: '24.81cm' },
    material: 'Aluminum unibody construction',
    features: [
      'M3 Max chip with 16-core CPU',
      'Up to 128GB unified memory',
      'Liquid Retina XDR display',
      'Up to 22 hours battery life',
      'Three Thunderbolt 4 ports',
      'MagSafe 3 charging'
    ],
    shape: 'Ultra-slim laptop'
  },
  {
    id: '4',
    name: 'Meta Quest 3',
    description: 'Breakthrough mixed reality. Transform your home into a new world of possibilities.',
    price: 499,
    category: 'oculus',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800',
    isBestSeller: false,
    stock: 15
  },
  {
    id: '5',
    name: 'Echo Studio Pro',
    description: 'Our best-sounding smart speaker yet. Immersive 3D audio with Alexa built-in.',
    price: 249,
    category: 'speakers',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=800',
    isBestSeller: true,
    stock: 20,
    colors: [
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Glacier White', hex: '#f5f5f5' }
    ],
    sizes: ['One Size'],
    weight: '3.5kg',
    dimensions: { width: '17.5cm', height: '20.6cm', depth: '17.5cm' },
    material: 'Premium fabric finish with metal base',
    features: [
      'Five directional speakers',
      'Dolby Atmos and spatial audio',
      'Automatic room adaptation',
      'Built-in Alexa voice assistant',
      'Multi-room music support',
      'Zigbee smart home hub'
    ],
    shape: 'Cylindrical speaker'
  },
  {
    id: '6',
    name: 'Apple Watch Ultra 2',
    description: 'The most rugged and capable Apple Watch ever. Designed for athletes and explorers.',
    price: 799,
    category: 'wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800',
    isBestSeller: true,
    stock: 5,
    colors: [
      { name: 'Natural Titanium', hex: '#b8b8b8' },
      { name: 'Black Titanium', hex: '#3a3a3a' }
    ],
    sizes: ['49mm'],
    weight: '61.4g',
    dimensions: { width: '49mm', height: '14.4mm', depth: '44mm' },
    material: 'Titanium case with sapphire crystal display',
    features: [
      'Precision dual-frequency GPS',
      'Up to 36 hours battery life',
      'Water resistant to 100m',
      'Action button for quick controls',
      'Brightest Apple display ever',
      'Advanced health and fitness tracking'
    ],
    shape: 'Square smartwatch with rounded corners'
  },
  {
    id: '7',
    name: 'PlayStation 5 Slim',
    description: 'Experience lightning-fast loading with an ultra-high-speed SSD and deeper immersion.',
    price: 449,
    category: 'consoles',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800',
    isBestSeller: true,
    stock: 10,
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['Standard Edition', 'Digital Edition'],
    weight: '3.2kg',
    dimensions: { width: '35.8cm', height: '9.6cm', depth: '21.6cm' },
    material: 'High-quality ABS plastic with matte finish',
    features: [
      'Ultra-high speed SSD',
      '4K gaming at 120fps',
      'Ray tracing support',
      'Tempest 3D AudioTech',
      'DualSense wireless controller',
      '825GB storage'
    ],
    shape: 'Curved console design'
  },
  {
    id: '8',
    name: 'Samsung Galaxy Watch 6',
    description: 'Advanced sleep coaching and personalized heart rate zones to crush your fitness goals.',
    price: 299,
    category: 'wearables',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800',
    isBestSeller: false,
    stock: 14
  },
  {
    id: '9',
    name: 'Dell XPS 15',
    description: 'A 15.6-inch laptop with a 4-sided InfinityEdge display and 100% Adobe RGB color.',
    price: 1899,
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800',
    isBestSeller: false,
    stock: 4
  },
  {
    id: '10',
    name: 'Logitech G Pro X 2',
    description: 'Wireless gaming headset designed with the world’s top pro players to remove obstacles.',
    price: 249,
    category: 'earphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800',
    isBestSeller: true,
    stock: 11
  },
  {
    id: '11',
    name: 'Xbox Series X',
    description: 'The fastest, most powerful Xbox ever. Play thousands of titles from four generations.',
    price: 499,
    category: 'consoles',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=800',
    isBestSeller: false,
    stock: 7
  },
  {
    id: '12',
    name: 'Sonos Move 2',
    description: 'Powerful, portable speaker with stereo sound and up to 24 hours of battery life.',
    price: 449,
    category: 'speakers',
    image: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=800',
    isBestSeller: false,
    stock: 9
  },
  {
    id: '13',
    name: 'Razer Blade 16',
    description: 'High-performance gaming laptop with an incredible QHD+ 240Hz display.',
    price: 2999,
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800',
    isBestSeller: true,
    stock: 2
  },
  {
    id: '14',
    name: 'Bose QC Ultra',
    description: 'World-class noise cancellation, quieter than ever before. Breakthrough spatial audio.',
    price: 429,
    category: 'earphones',
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=800',
    isBestSeller: false,
    stock: 12
  },
  {
    id: '15',
    name: 'Nintendo Switch OLED',
    description: 'Features a vibrant 7-inch OLED screen, a wide adjustable stand, and a wired LAN port.',
    price: 349,
    category: 'consoles',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=800',
    isBestSeller: true,
    stock: 18
  },
  {
    id: '16',
    name: 'Marshall Emberton II',
    description: 'A compact portable speaker with the loud and vibrant sound only Marshall can deliver.',
    price: 169,
    category: 'speakers',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800',
    isBestSeller: false,
    stock: 25
  },
  {
    id: '17',
    name: 'Oculus Rift S',
    description: 'High-performance PC VR gaming. Advanced optics for vivid colors and reduced "screen-door" effect.',
    price: 399,
    category: 'oculus',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800',
    isBestSeller: false,
    stock: 6
  },
  {
    id: '18',
    name: 'Garmin Epix Pro',
    description: 'Ultimate high-performance smartwatch with an AMOLED display and a built-in flashlight.',
    price: 899,
    category: 'wearables',
    image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=800',
    isBestSeller: false,
    stock: 5
  }
];
