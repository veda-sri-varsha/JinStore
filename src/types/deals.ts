export interface deals {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string; 
  stock?: number; 
  rating?: number; 
  brand?: string; 
  discount?: number; 
  originalPrice?: number; 
  quantity?: number; 
}