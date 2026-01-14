import { Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addToCart } from '@/entities/cart/slices/cartSlice';
import { useCatalogFilters } from '@/entities/catalog/hooks/useCatalogFilters';
import { ITEMS_PER_PAGE } from '@/entities/catalog/services/catalogService';
import CatalogFilters from '@/features/catalog/ui/CatalogFilters';
import CatalogPagination from '@/features/catalog/ui/CatalogPagination';
import CatalogProducts from '@/features/catalog/ui/CatalogProducts';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    categories = [],
    total = 0,
    isLoading,
    page,
    filters = {},
    handlers,
  } = useCatalogFilters();

  const { setCategory, setSort, setSearch, setPage } = handlers;
  const { category = '', sort = '', search = '' } = filters;

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    if (searchInput === search) return;
    const handler = setTimeout(() => {
      if (searchInput !== search) {
        setSearch(searchInput, { replace: true });
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput, search, setSearch]);

  // Normalize categories so the select can keep a matching slug value.
  const normalizedCategoryValues = useMemo(() => {
    if (!categories.length) return [];
    return categories
      .map((item) => {
        if (!item) return '';
        if (typeof item === 'string') return item;
        return item?.slug ?? item?.name ?? '';
      })
      .filter(Boolean);
  }, [categories]);

  const safeCategory = normalizedCategoryValues.includes(category) ? category : '';
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const showSkeletons = isLoading || !products;

  const getCategoryLabel = (category) => {
    if (!category) return '';
    if (typeof category === 'string') return category;
    return category?.name ?? category?.slug ?? '';
  };

  const handleSearchSubmit = useCallback(() => {
    setSearch(searchInput, { replace: true });
  }, [searchInput, setSearch]);

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
          discountPercentage: product.discountPercentage ?? 0,
        }),
      );
    },
    [dispatch],
  );

  return (
    <StyledPageContainer>
      <Typography variant="h4" gutterBottom>
        Catalog
      </Typography>

      <CatalogFilters
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        categories={categories}
        safeCategory={safeCategory}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        getCategoryLabel={getCategoryLabel}
      />

      <CatalogProducts
        products={products}
        showSkeletons={showSkeletons}
        onAddToCart={handleAddToCart}
      />

      <CatalogPagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />
    </StyledPageContainer>
  );
};

export default CatalogPage;
