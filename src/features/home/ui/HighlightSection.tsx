import type { HighlightSectionProps } from '@/features/home/types';
import HomeCardSkeleton from '@/features/home/ui/HomeCardSkeleton';
import { StyledSectionGrid, StyledSectionTitle } from '@/features/home/ui/homeStyles';
import SeeMoreCard from '@/shared/ui/SeeMoreCard';
import ProductCard from '@/widgets/product/ProductCard';

// Shows a title and grid of highlighted products.
const HighlightSection = ({
  title,
  items = [],
  link,
  withMargin,
  onAddToCart,
}: HighlightSectionProps) => {
  const hasItems = items.length > 0;

  return (
    <>
      <StyledSectionTitle variant="h4" gutterBottom withMargin={withMargin}>
        {title}
      </StyledSectionTitle>

      <StyledSectionGrid withMargin={withMargin}>
        {hasItems ? (
          <>
            {items.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
            <SeeMoreCard to={link} />
          </>
        ) : (
          <HomeCardSkeleton />
        )}
      </StyledSectionGrid>
    </>
  );
};

export default HighlightSection;
