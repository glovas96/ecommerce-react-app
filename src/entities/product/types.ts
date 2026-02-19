import type { Product as CatalogProduct } from '@/entities/catalog/api/productsApi';

// Basic product shape used by home/catalog & checkout
export interface Product extends CatalogProduct {
  description?: string;
  stock?: number;
  brand?: string;
}

// Product detail returned to UI
export interface ProductDetail extends Product {
  oldPrice?: string | null;
  likes?: number;
  message?: string;
}

// Related product item shown in slider
export type RelatedProduct = ProductDetail;

// Service helpers
export interface ProductServiceResult {
  product: ProductDetail | null;
  related: RelatedProduct[];
}
