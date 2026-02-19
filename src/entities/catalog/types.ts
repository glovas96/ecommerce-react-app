import type { CategoryList } from '@/entities/catalog/api/categoriesApi';
import type { ProductList } from '@/entities/catalog/api/productsApi';

// Available sort options for catalog listings
export type CatalogSort =
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc'
  | 'discount_desc'
  | 'alpha_asc'
  | 'alpha_desc'
  | 'id_desc';

// Parameters for fetching catalog data
export interface CatalogQuery {
  category?: string;
  search?: string;
  sort?: CatalogSort;
  page: number;
}

// Result returned to UI after filtering and pagination
export interface CatalogResult {
  items: ProductList;
  total: number;
  categories: CategoryList;
}

// Parameters stored in the URL for catalog filters
export interface CatalogFiltersQuery {
  category: string;
  sort: CatalogSort | '';
  search: string;
}

// Navigation options accepted by URL helpers
export interface CatalogFiltersUrlOptions {
  replace?: boolean;
  state?: unknown;
}

// Local state maintained inside the catalog hook
export interface CatalogFiltersState {
  items: ProductList | null;
  categories: CategoryList;
  total: number;
  isLoading: boolean;
  page: number;
}

// Handlers provided by the catalog hook
export interface CatalogFiltersHandlers {
  setCategory: (value: string) => void;
  setSort: (value: string) => void;
  setSearch: (value: string, options?: CatalogFiltersUrlOptions) => void;
  setPage: (value: number) => void;
}

// Hook result combining state, filters, and callbacks
export interface UseCatalogFiltersResult extends CatalogFiltersState {
  filters: CatalogFiltersQuery;
  handlers: CatalogFiltersHandlers;
}
