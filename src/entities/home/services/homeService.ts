import { fetchHighlightProducts } from '@/entities/home/api/homeApi';
import type { HighlightQuery, HighlightProductList } from '@/entities/home/types';

// Query params for highlight variants
const POPULAR_QUERY: HighlightQuery = '?sortBy=rating&order=desc&limit=4';
const LATEST_QUERY: HighlightQuery = '?sortBy=id&order=desc&limit=4';
const DISCOUNT_QUERY: HighlightQuery = '?sortBy=discountPercentage&order=desc&limit=4';

// Load top-rated products
export const loadPopularHighlights = async (): Promise<HighlightProductList> =>
  fetchHighlightProducts(POPULAR_QUERY);

// Load newest products
export const loadLatestHighlights = async (): Promise<HighlightProductList> =>
  fetchHighlightProducts(LATEST_QUERY);

// Load highest discount products
export const loadDiscountHighlights = async (): Promise<HighlightProductList> =>
  fetchHighlightProducts(DISCOUNT_QUERY);
