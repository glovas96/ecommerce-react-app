import type { ProductDetail, RelatedProduct } from '@/entities/product/types';

export interface ProductGalleryProps {
  images?: string[];
  selectedImage?: string | null;
  onSelect: (value: string) => void;
  displayImage: string;
  discountPercentage?: number;
  productTitle?: string;
}

export interface ProductInfoProps {
  product: ProductDetail;
}

export interface ProductActionsProps {
  onAddToCart: (quantity: number) => void;
  onBuyNow: () => void;
  quantity: number;
  increase: () => void;
  decrease: () => void;
}

export interface RelatedProductsProps {
  related: RelatedProduct[];
  categoryLink: string;
  onAddToCart?: (product: RelatedProduct) => void;
}
