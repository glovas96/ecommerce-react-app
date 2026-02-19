import type { Product } from '@/entities/product/types';

const BASE_URL = 'https://dummyjson.com/products';

export const fetchProduct = async (id: number | string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data: Product = await res.json();
  return data;
};

export const fetchRelatedProducts = async (category: string): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/category/${category}?sortBy=rating&order=desc&limit=5`);
  const data = await res.json();
  return Array.isArray(data.products) ? (data.products as Product[]) : [];
};
