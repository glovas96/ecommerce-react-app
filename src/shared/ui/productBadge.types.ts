export type ProductBadgeVariant = 'sale' | 'hot';

export interface ProductBadgeProps {
  variant?: ProductBadgeVariant;
  label?: string;
}
