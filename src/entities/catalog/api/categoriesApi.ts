export type CategoryItem = string | { slug?: string; name?: string; [key: string]: unknown };
export type CategoryList = CategoryItem[];

// Load available product categories
export const fetchCategories = async (): Promise<CategoryList> => {
  const res = await fetch('https://dummyjson.com/products/categories');
  const data: CategoryList = await res.json();
  return Array.isArray(data) ? data : [];
};
