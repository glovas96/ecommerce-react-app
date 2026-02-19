import type { CatalogProductsProps } from '@/features/catalog/types';
import { StyledEmptyMessage, StyledProductsGrid } from '@/features/catalog/ui/catalogStyles';
import HomeCardSkeleton from '@/features/home/ui/HomeCardSkeleton';
import ProductCard from '@/widgets/product/ProductCard';

const CatalogProducts = ({ products = [], showSkeletons, onAddToCart }: CatalogProductsProps) => {
  if (showSkeletons) {
    return (
      <StyledProductsGrid>
        <HomeCardSkeleton rows={5} withSeeMore={false} />
      </StyledProductsGrid>
    );
  }

  if (!products.length) {
    return (
      <StyledEmptyMessage color="text.secondary">
        No products matched your filters.
      </StyledEmptyMessage>
    );
  }

  return (
    <StyledProductsGrid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </StyledProductsGrid>
  );
};

export default CatalogProducts;
