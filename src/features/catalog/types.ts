import type { CategoryList } from '@/entities/catalog/api/categoriesApi';
import type { Product } from '@/entities/catalog/api/productsApi';

// Used by catalog filters UI to display available options
export interface CatalogFiltersProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  categories: CategoryList;
  safeCategory: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  getCategoryLabel: (category: CategoryList[number]) => string;
}

export interface CatalogPaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export interface CatalogProductsProps {
  products: Product[];
  showSkeletons: boolean;
  onAddToCart: (product: CatalogProductsProps['products'][number]) => void;
}
