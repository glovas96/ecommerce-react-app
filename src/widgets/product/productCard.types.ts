import type { Product } from '@/entities/product/types';

// Props for the catalog grid card.
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}
