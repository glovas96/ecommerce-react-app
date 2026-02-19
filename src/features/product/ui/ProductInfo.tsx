import { Typography, Rating } from '@mui/material';

import type { ProductInfoProps } from '@/features/product/types';
import {
  StyledRatingRow,
  StyledRatingValue,
  StyledPriceSection,
  StyledDescriptionText,
  StyledSpecSection,
  StyledSpecTitle,
  StyledSpecItem,
  StyledCurrentPrice,
  StyledOldPrice,
} from '@/features/product/ui/productStyles';

// Displays product core details and specifications.
const ProductInfo = ({ product }: ProductInfoProps) => {
  const ratingValue = product.rating ?? 0;
  const hasDiscount = Boolean(product.discountPercentage);
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>

      <StyledRatingRow>
        <Rating value={ratingValue} precision={0.1} readOnly />
        <StyledRatingValue variant="body2">{ratingValue.toFixed(1)}</StyledRatingValue>
      </StyledRatingRow>

      <StyledPriceSection>
        {hasDiscount ? (
          <>
            <StyledCurrentPrice variant="h5" color="primary">
              ${product.price}
            </StyledCurrentPrice>

            <StyledOldPrice variant="body1">{product.oldPrice}</StyledOldPrice>

            <Typography variant="body2" color="error">
              -{product.discountPercentage}% discount
            </Typography>
          </>
        ) : (
          <StyledCurrentPrice variant="h5" color="primary">
            ${product.price}
          </StyledCurrentPrice>
        )}
      </StyledPriceSection>

      <StyledDescriptionText variant="body1">{product.description}</StyledDescriptionText>

      <StyledSpecSection>
        <StyledSpecTitle variant="h6">Specifications</StyledSpecTitle>

        <StyledSpecItem variant="body2">
          <strong>Brand:</strong> {product.brand}
        </StyledSpecItem>
        <StyledSpecItem variant="body2">
          <strong>Category:</strong> {product.category}
        </StyledSpecItem>
        <StyledSpecItem variant="body2">
          <strong>In stock:</strong> {product.stock} pcs
        </StyledSpecItem>
        <StyledSpecItem variant="body2">
          <strong>Warranty:</strong> 12‑month official warranty
        </StyledSpecItem>
      </StyledSpecSection>
    </div>
  );
};

export default ProductInfo;
