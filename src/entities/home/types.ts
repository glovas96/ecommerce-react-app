import type { Product } from '@/entities/product/types';

// Query parameter format used by highlight endpoints
export type HighlightQuery = string;

// Lists of highlight products shared between API, services and hooks
export type HighlightProductList = Product[];

// Hook state returned by useHomeHighlights
export interface HomeHighlightsState {
  popular: HighlightProductList;
  latest: HighlightProductList;
  discounts: HighlightProductList;
  loading: boolean;
  error: string | null;
}
