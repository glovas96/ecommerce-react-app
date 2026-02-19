import type { ProductDetail, RelatedProduct } from '@/entities/product/types';

import { fetchProduct, fetchRelatedProducts } from '../api/productApi';

export const calculateOldPrice = (product: ProductDetail | RelatedProduct): string | null =>
  product.discountPercentage
    ? (product.price / (1 - (product.discountPercentage ?? 0) / 100)).toFixed(2)
    : null;

export const loadProduct = async (id: number | string): Promise<ProductDetail> => {
  const product = await fetchProduct(id);
  return {
    ...product,
    oldPrice: calculateOldPrice(product),
  };
};

export const loadRelated = async (
  category: string,
  currentId: number | string,
): Promise<RelatedProduct[]> => {
  const related = await fetchRelatedProducts(category);
  return related
    .filter((item) => item.id !== currentId)
    .slice(0, 4)
    .map((item) => ({
      ...item,
      oldPrice: calculateOldPrice(item),
    }));
};
