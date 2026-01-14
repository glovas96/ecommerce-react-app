// Base endpoint for highlight requests
const BASE_URL = 'https://dummyjson.com/products';

// Fetch products for a highlight carousel
export const fetchHighlightProducts = async (query) => {
  const url = `${BASE_URL}${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return Array.isArray(data.products) ? data.products : [];
};
