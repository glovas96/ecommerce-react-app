import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getCatalogData } from '../services/catalogService';

export const useCatalogFilters = () => {
  // Manage query filters in the URL
  const [searchParams, setSearchParams] = useSearchParams();
  // Track catalog response and UI flags
  const [state, setState] = useState({
    products: null,
    categories: [],
    total: 0,
    isLoading: true,
    page: 1,
  });

  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;

  // Update filters and reset pagination
  const updateParam = useCallback(
    (key, value, options = {}) => {
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

  // Refresh catalog data when filters change
  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    getCatalogData({ category, search, sort, page }).then((result) => {
      setState({ ...result, isLoading: false, page });
    });
  }, [category, search, sort, page]);

  // Clear invalid category selections automatically
  // Normalize each category to a scalar value for filter validation.
  const normalizedCategories = useMemo(() => {
    if (!state.categories.length) return [];
    return state.categories
      .map((item) => {
        if (!item) return '';
        if (typeof item === 'string') return item;
        return item?.slug ?? item?.name ?? '';
      })
      .filter(Boolean);
  }, [state.categories]);

  useEffect(() => {
    if (!category || !normalizedCategories.length) return;
    if (!normalizedCategories.includes(category)) {
      updateParam('category', '');
    }
  }, [category, normalizedCategories, updateParam]);

  // Provide filters and callbacks to callers
  return {
    ...state,
    filters: { category, sort, search },
    handlers: {
      setCategory: (value) => updateParam('category', value),
      setSort: (value) => updateParam('sort', value),
      setSearch: (value, options) => updateParam('search', value, options),
      setPage: (value) => updateParam('page', String(value)),
    },
  };
};
