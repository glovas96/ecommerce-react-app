import type { Product, ProductsResponse } from '@/entities/catalog/api/productsApi';

// Base endpoint for highlight requests
const BASE_URL = 'https://dummyjson.com/products';

// Fetch products for a highlight carousel
export const fetchHighlightProducts = async (query: string): Promise<Product[]> => {
  const url = `${BASE_URL}${query}`;
  const res = await fetch(url);
  const data: ProductsResponse = await res.json();
  return Array.isArray(data.products) ? data.products : [];
};
