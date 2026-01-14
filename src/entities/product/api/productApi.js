// Base endpoint for individual products
const BASE_URL = 'https://dummyjson.com/products';

// Fetch product details by ID
export const fetchProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

// Fetch related products by category
export const fetchRelatedProducts = async (category) => {
  const res = await fetch(`${BASE_URL}/category/${category}?sortBy=rating&order=desc&limit=5`);
  const data = await res.json();
  return Array.isArray(data.products) ? data.products : [];
};
