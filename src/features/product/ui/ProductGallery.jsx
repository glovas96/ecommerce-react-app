import React from 'react';

import {
  StyledThumbnailColumn,
  StyledThumbnailPreview,
  StyledThumbnailImage,
  StyledImageWrapper,
  StyledMainImage,
} from '@/features/product/ui/productStyles';
import ProductBadge from '@/shared/ui/ProductBadge';

// Renders thumbnails alongside the main product picture.
const ProductGallery = ({
  images = [],
  selectedImage,
  onSelect,
  displayImage,
  discountPercentage = 0,
  productTitle = '',
}) => {
  const hasDiscount = discountPercentage >= 10;
  const badgeVariant = discountPercentage > 15 ? 'hot' : hasDiscount ? 'sale' : null;
  const fallbackThumbnails = displayImage ? [displayImage] : [];
  const thumbnails = (images.length ? images : fallbackThumbnails).filter(Boolean);

  return (
    <React.Fragment>
      <StyledThumbnailColumn>
        {thumbnails.map((img, index) => (
          <StyledThumbnailPreview
            key={`${img}-${index}`}
            selected={selectedImage === img}
            onClick={() => onSelect(img)}
          >
            <StyledThumbnailImage src={img} alt={`thumbnail-${index}`} />
          </StyledThumbnailPreview>
        ))}
      </StyledThumbnailColumn>

      <StyledImageWrapper>
        {badgeVariant && <ProductBadge variant={badgeVariant} />}
        <StyledMainImage src={displayImage} alt={productTitle || 'product'} />
      </StyledImageWrapper>
    </React.Fragment>
  );
};

export default ProductGallery;
