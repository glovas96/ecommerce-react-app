import React from 'react';

import { StyledEmptyMessage, StyledProductsGrid } from '@/features/catalog/ui/catalogStyles';
import HomeCardSkeleton from '@/features/home/ui/HomeCardSkeleton';
import ProductCard from '@/widgets/product/ProductCard';

// Renders product grid or placeholder states.
const CatalogProducts = ({ products = [], showSkeletons, onAddToCart }) => {
  if (showSkeletons) {
    return (
      <React.Fragment>
        <StyledProductsGrid>
          <HomeCardSkeleton rows={5} withSeeMore={false} />
        </StyledProductsGrid>
      </React.Fragment>
    );
  }

  if (!products.length) {
    return (
      <React.Fragment>
        <StyledEmptyMessage color="text.secondary">
          No products matched your filters.
        </StyledEmptyMessage>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <StyledProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </StyledProductsGrid>
    </React.Fragment>
  );
};

export default CatalogProducts;
