import { Button, Card, Rating, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import ProductBadge from '@/shared/ui/ProductBadge';
import {
  StyledCardActions,
  StyledCardContent,
  StyledCardMedia,
  StyledCategoryLabel,
  StyledDiscountText,
  StyledMultiLineTitle,
  StyledPriceRow,
  StyledRatingRow,
  StyledRatingValue,
} from '@/widgets/product/productCardStyles';

const ProductCard = ({ product, onAddToCart }) => {
  const rating = Number(product.rating ?? 0);
  const isHotDeal = product.discountPercentage > 15;
  const hasDiscount = product.discountPercentage >= 10;

  const oldPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <React.Fragment>
      <Card component={Link} to={`/product/${product.id}`} variant="product">
        {(isHotDeal || hasDiscount) && <ProductBadge variant={isHotDeal ? 'hot' : 'sale'} />}

        <StyledCardMedia component="img" image={product.thumbnail} alt={product.title} />

        <StyledCardContent>
          <StyledCategoryLabel variant="caption" color="text.secondary">
            {product.category}
          </StyledCategoryLabel>

          <StyledMultiLineTitle variant="subtitle1" fontWeight="medium" component="h2">
            {product.title}
          </StyledMultiLineTitle>

          {rating > 0 && (
            // Quick summary of the product rating.
            <StyledRatingRow direction="row">
              <Rating value={rating} precision={0.1} readOnly size="small" />
              <StyledRatingValue variant="body2">{rating.toFixed(1)}</StyledRatingValue>
            </StyledRatingRow>
          )}

          <StyledPriceRow direction="row">
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              ${product.price.toFixed(2)}
            </Typography>
            {oldPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ${oldPrice}
              </Typography>
            )}
          </StyledPriceRow>
          {hasDiscount && (
            <StyledDiscountText variant="body2" color="error">
              -{product.discountPercentage}% off
            </StyledDiscountText>
          )}
        </StyledCardContent>
        {onAddToCart && (
          <StyledCardActions>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              Add to cart
            </Button>
          </StyledCardActions>
        )}
      </Card>
    </React.Fragment>
  );
};

export default ProductCard;
