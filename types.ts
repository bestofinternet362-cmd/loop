
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isBestSeller?: boolean;
  stock: number;
  colors?: { name: string; hex: string; }[];
  sizes?: string[];
  weight?: string;
  dimensions?: { width: string; height: string; depth: string; };
  material?: string;
  features?: string[];
  shape?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  color: string;
  tagline: string;
}

export type FilterState = {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
};
