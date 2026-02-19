import { useCallback } from 'react';

import { useCartActions } from '@/entities/cart/hooks/useCartActions';
import type { CartItem } from '@/entities/cart/types';
import { useHomeHighlights } from '@/entities/home/hooks/useHomeHighlights';
import type { Product } from '@/entities/product/types';
import HighlightSection from '@/features/home/ui/HighlightSection';
import HomeHero from '@/features/home/ui/HomeHero';
import { StyledErrorText } from '@/features/home/ui/homeStyles';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';

const HomePage = () => {
  const { popular, latest, discounts, error } = useHomeHighlights();
  const { addToCart } = useCartActions();

  const handleAddToCart = useCallback(
    (product: Product) => {
      const item: CartItem = {
        ...product,
        quantity: 1,
        discountPercentage: product.discountPercentage ?? 0,
      };
      addToCart(item);
    },
    [addToCart],
  );

  return (
    <StyledPageContainer>
      <HomeHero />

      {error && <StyledErrorText color="error">Failed to load highlights.</StyledErrorText>}

      <HighlightSection
        title="Popular products"
        items={popular}
        link="/catalog?sort=rating_desc"
        onAddToCart={handleAddToCart}
      />
      <HighlightSection
        title="Latest products"
        items={latest}
        link="/catalog?sort=id_desc"
        withMargin
        onAddToCart={handleAddToCart}
      />
      <HighlightSection
        title="Discount deals"
        items={discounts}
        link="/catalog?sort=discount_desc"
        withMargin
        onAddToCart={handleAddToCart}
      />
    </StyledPageContainer>
  );
};

export default HomePage;
