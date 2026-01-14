// Load available product categories
export const fetchCategories = async () => {
  const res = await fetch('https://dummyjson.com/products/categories');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};
