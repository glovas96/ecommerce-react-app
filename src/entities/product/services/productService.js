import { fetchProduct, fetchRelatedProducts } from '../api/productApi';

// Derive non-discounted price for display
export const calculateOldPrice = (product) =>
  product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

// Load product data with helper metadata
export const loadProduct = async (id) => {
  const product = await fetchProduct(id);
  return {
    ...product,
    oldPrice: calculateOldPrice(product),
  };
};

// Load related products and exclude current item
export const loadRelated = async (category, currentId) => {
  const related = await fetchRelatedProducts(category);
  return related
    .filter((item) => item.id !== currentId)
    .slice(0, 4)
    .map((item) => ({
      ...item,
      oldPrice: calculateOldPrice(item),
    }));
};
