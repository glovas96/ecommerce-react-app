import React from 'react';

import { StyledRelatedSection, StyledRelatedTitle } from '@/features/product/ui/productStyles';
import { StyledProductGrid } from '@/shared/styles/StyledProductGrid';
import SeeMoreCard from '@/shared/ui/SeeMoreCard';
import ProductCard from '@/widgets/product/ProductCard';

// Shows related products and a see-more entry.
const RelatedProducts = ({ related, categoryLink }) => (
  <React.Fragment>
    <StyledRelatedSection>
      <StyledRelatedTitle variant="h5">Related products</StyledRelatedTitle>

      <StyledProductGrid>
        {related.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}

        <SeeMoreCard to={categoryLink} />
      </StyledProductGrid>
    </StyledRelatedSection>
  </React.Fragment>
);

export default RelatedProducts;
