// Base endpoint for product data
const BASE_URL = 'https://dummyjson.com/products';

// Minimal product shape used across catalog
export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  discountPercentage: number;
  category: string;
  thumbnail: string;
  images: string[];
}

// Response from dummyjson products endpoint
export interface ProductsResponse {
  products: Product[];
  total: number;
  limit: number;
  skip: number;
}

export type ProductList = Product[];

// Always return array to keep UI stable
export const fetchProducts = async (category = ''): Promise<Product[]> => {
  const url = category ? `${BASE_URL}/category/${category}` : `${BASE_URL}?limit=200`;
  const res = await fetch(url);
  const data: ProductsResponse = await res.json();
  return Array.isArray(data.products) ? data.products : [];
};
