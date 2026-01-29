import { Typography, Rating } from '@mui/material';
import React from 'react';

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
const ProductInfo = ({ product, hasDiscount, oldPrice }) => (
  <React.Fragment>
    <Typography variant="h4" gutterBottom>
      {product.title}
    </Typography>

    <StyledRatingRow>
      <Rating value={product.rating} precision={0.1} readOnly />
      <StyledRatingValue variant="body2">{product.rating.toFixed(1)}</StyledRatingValue>
    </StyledRatingRow>

    <StyledPriceSection>
      {hasDiscount ? (
        <React.Fragment>
          <StyledCurrentPrice variant="h5" color="primary">
            ${product.price}
          </StyledCurrentPrice>

          <StyledOldPrice variant="body1">${oldPrice}</StyledOldPrice>

          <Typography variant="body2" color="error">
            -{product.discountPercentage}% discount
          </Typography>
        </React.Fragment>
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
  </React.Fragment>
);

export default ProductInfo;
