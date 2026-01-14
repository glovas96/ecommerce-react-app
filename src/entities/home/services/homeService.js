import { fetchHighlightProducts } from '@/entities/home/api/homeApi';

// Query params for highlight variants
const POPULAR_QUERY = '?sortBy=rating&order=desc&limit=4';
const LATEST_QUERY = '?sortBy=id&order=desc&limit=4';
const DISCOUNT_QUERY = '?sortBy=discountPercentage&order=desc&limit=4';

// Load top-rated products
export const loadPopularHighlights = async () => fetchHighlightProducts(POPULAR_QUERY);

// Load newest products
export const loadLatestHighlights = async () => fetchHighlightProducts(LATEST_QUERY);

// Load highest discount products
export const loadDiscountHighlights = async () => fetchHighlightProducts(DISCOUNT_QUERY);
