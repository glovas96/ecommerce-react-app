import { Button, Card, Rating, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import ProductBadge from '@/shared/ui/ProductBadge';
import type { ProductCardProps } from '@/widgets/product/productCard.types';
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

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const rating = Number(product.rating ?? 0);
  const discount = product.discountPercentage ?? 0;
  const isHotDeal = discount > 15;
  const hasDiscount = discount >= 10;

  const oldPrice = hasDiscount ? (product.price / (1 - discount / 100)).toFixed(2) : null;

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <Card variant="product">
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
              -{discount}% off
            </StyledDiscountText>
          )}
        </StyledCardContent>
        {onAddToCart && (
          <StyledCardActions>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onAddToCart(product);
              }}
            >
              Add to cart
            </Button>
          </StyledCardActions>
        )}
      </Card>
    </Link>
  );
};

export default ProductCard;
