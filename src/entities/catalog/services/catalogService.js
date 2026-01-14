import { fetchCategories } from '../api/categoriesApi';
import { fetchProducts } from '../api/productsApi';

// Items shown per page
export const ITEMS_PER_PAGE = 20;

// Filter products by search query
const applySearch = (items, search) =>
  search ? items.filter((p) => p.title.toLowerCase().includes(search.toLowerCase())) : items;

// Sort products based on provided order
const applySort = (items, sort) => {
  const sorted = [...items];
  switch (sort) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating_desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'discount_desc':
      return sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
    case 'alpha_asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'alpha_desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'id_desc':
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
};

// Slice items to current page window
const paginate = (items, page) => {
  const start = (page - 1) * ITEMS_PER_PAGE;
  return items.slice(start, start + ITEMS_PER_PAGE);
};

// Compose catalog data with filtering and pagination
export const getCatalogData = async ({ category, search, sort, page }) => {
  const [products, categories] = await Promise.all([fetchProducts(category), fetchCategories()]);
  const searched = applySearch(products, search);
  const sorted = applySort(searched, sort);
  const paginated = paginate(sorted, page);
  return {
    items: paginated,
    total: sorted.length,
    categories,
  };
};
