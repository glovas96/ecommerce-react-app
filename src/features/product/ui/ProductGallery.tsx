import type { ProductGalleryProps } from '@/features/product/types';
import {
  StyledThumbnailColumn,
  StyledThumbnailPreview,
  StyledThumbnailImage,
  StyledImageWrapper,
  StyledMainImage,
} from '@/features/product/ui/productStyles';
import ProductBadge from '@/shared/ui/ProductBadge';

const ProductGallery = ({
  images = [],
  selectedImage,
  onSelect,
  displayImage,
  discountPercentage = 0,
  productTitle = '',
}: ProductGalleryProps) => {
  const hasDiscount = discountPercentage >= 10;
  const badgeVariant = discountPercentage > 15 ? 'hot' : hasDiscount ? 'sale' : null;
  const fallbackThumbnails = displayImage ? [displayImage] : [];
  const thumbnails = (images.length ? images : fallbackThumbnails).filter(Boolean);
  const badgeLabel = badgeVariant === 'hot' ? 'HOT DEAL' : 'SALE';

  return (
    <>
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
        {badgeVariant && <ProductBadge variant={badgeVariant} label={badgeLabel} />}
        <StyledMainImage src={displayImage} alt={productTitle || 'product'} />
      </StyledImageWrapper>
    </>
  );
};

export default ProductGallery;
