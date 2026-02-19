import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import type {
  CatalogFiltersQuery,
  CatalogFiltersUrlOptions,
  CatalogSort,
} from '@/entities/catalog/types';

type FilterKey = 'category' | 'sort' | 'search' | 'page';

const allowedSorts: CatalogSort[] = [
  'price_asc',
  'price_desc',
  'rating_desc',
  'discount_desc',
  'alpha_asc',
  'alpha_desc',
  'id_desc',
];

const normalizeSort = (value: string | null): CatalogSort | '' =>
  value && allowedSorts.includes(value as CatalogSort) ? (value as CatalogSort) : '';

const readCatalogFilters = (params: URLSearchParams): CatalogFiltersQuery => ({
  category: params.get('category') ?? '',
  sort: normalizeSort(params.get('sort')),
  search: params.get('search') ?? '',
});

export const useCatalogUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => readCatalogFilters(searchParams), [searchParams]);
  const page = Number(searchParams.get('page')) || 1;

  const setParam = useCallback(
    (key: FilterKey, value: string, options: CatalogFiltersUrlOptions = {}) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
        if (key !== 'page') {
          params.set('page', '1');
        }
        return params;
      }, options);
    },
    [setSearchParams],
  );

  return { filters, page, setParam };
};
