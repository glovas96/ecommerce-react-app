import type { RelatedProductsProps } from '@/features/product/types';
import { StyledRelatedSection, StyledRelatedTitle } from '@/features/product/ui/productStyles';
import { StyledProductGrid } from '@/shared/styles/StyledProductGrid';
import SeeMoreCard from '@/shared/ui/SeeMoreCard';
import ProductCard from '@/widgets/product/ProductCard';

// Shows related products and a see-more entry.
const RelatedProducts = ({ related, categoryLink, onAddToCart }: RelatedProductsProps) => (
  <StyledRelatedSection>
    <StyledRelatedTitle variant="h5">Related products</StyledRelatedTitle>

    <StyledProductGrid>
      {related.map((item) => (
        <ProductCard key={item.id} product={item} onAddToCart={onAddToCart} />
      ))}

      <SeeMoreCard to={categoryLink} />
    </StyledProductGrid>
  </StyledRelatedSection>
);

export default RelatedProducts;
