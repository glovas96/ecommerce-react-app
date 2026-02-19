import { useEffect, useMemo, useState } from 'react';

import { normalizeCategoryList } from '@/entities/catalog/hooks/utils/normalizeCategoryList';
import { useCatalogUrlParams } from '@/entities/catalog/hooks/utils/useCatalogUrlParams';
import { getCatalogData } from '@/entities/catalog/services/catalogService';
import type {
  CatalogFiltersHandlers,
  CatalogFiltersState,
  CatalogFiltersQuery,
  CatalogFiltersUrlOptions,
  CatalogSort,
  UseCatalogFiltersResult,
} from '@/entities/catalog/types';

export const useCatalogFilters = (): UseCatalogFiltersResult => {
  const { filters, page, setParam } = useCatalogUrlParams();
  const [state, setState] = useState<CatalogFiltersState>({
    items: null,
    categories: [],
    total: 0,
    isLoading: true,
    page: 1,
  });

  const { category, sort, search } = filters;

  const catalogSort = (sort as CatalogSort) || undefined;

  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    getCatalogData({ category, search, sort: catalogSort, page }).then((result) => {
      setState({ ...result, isLoading: false, page });
    });
  }, [category, search, catalogSort, page]);

  const normalizedCategories = useMemo(
    () => normalizeCategoryList(state.categories),
    [state.categories],
  );

  useEffect(() => {
    if (!category || !normalizedCategories.length) return;
    if (!normalizedCategories.includes(category)) {
      setParam('category', '');
    }
  }, [category, normalizedCategories, setParam]);

  const handlers: CatalogFiltersHandlers = {
    setCategory: (value) => setParam('category', value),
    setSort: (value) => setParam('sort', value),
    setSearch: (value, options: CatalogFiltersUrlOptions = {}) =>
      setParam('search', value, options),
    setPage: (value) => setParam('page', String(value)),
  };

  const catalogFilters: CatalogFiltersQuery = {
    category,
    sort,
    search,
  };

  return {
    ...state,
    filters: catalogFilters,
    handlers,
  };
};
