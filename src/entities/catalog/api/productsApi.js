// Base endpoint for product data
const BASE_URL = 'https://dummyjson.com/products';

// Always return array to keep UI stable
export const fetchProducts = async (category = '') => {
  const url = category ? `${BASE_URL}/category/${category}` : `${BASE_URL}?limit=200`;
  const res = await fetch(url);
  const data = await res.json();
  return Array.isArray(data.products) ? data.products : [];
};
