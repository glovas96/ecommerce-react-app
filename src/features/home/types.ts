import type { HighlightProductList } from '@/entities/home/types';

export interface HighlightSectionProps {
  title: string;
  items: HighlightProductList;
  link: string;
  withMargin?: boolean;
  onAddToCart?: (product: HighlightProductList[number]) => void;
}

export interface HomeCardSkeletonProps {
  rows?: number;
  withSeeMore?: boolean;
}
