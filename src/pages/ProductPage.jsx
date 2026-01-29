import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addToCart } from '@/entities/cart/slices/cartSlice';
import { useProductDetails } from '@/entities/product/hooks/useProductDetails';
import ProductActions from '@/features/product/ui/ProductActions';
import ProductGallery from '@/features/product/ui/ProductGallery';
import ProductInfo from '@/features/product/ui/ProductInfo';
import {
  StyledProductLayout,
  StyledInfoColumn,
  StyledBackToCatalogButton,
} from '@/features/product/ui/productStyles';
import RelatedProducts from '@/features/product/ui/RelatedProducts';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';
import FullPageLoader from '@/shared/ui/FullPageLoader';

const { Fragment } = React;

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, related, selectedImage, setSelectedImage, quantity, increase, decrease } =
    useProductDetails();

  // Dispatch cart addition
  const handleAdd = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity,
        discountPercentage: product.discountPercentage ?? 0,
      }),
    );
  };

  const handleBuyNow = () => {
    if (!product) return;

    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
      discountPercentage: product.discountPercentage ?? 0,
    };

    const serialized = encodeURIComponent(JSON.stringify(payload));
    navigate(`/checkout?pendingBuyNow=${serialized}`);
  };

  if (!product)
    return (
      <StyledPageContainer>
        <FullPageLoader />
      </StyledPageContainer>
    );

  if (product?.message === 'Product not found')
    return (
      <StyledPageContainer>
        <Typography variant="h5" gutterBottom>
          Product not found
        </Typography>

        <Typography variant="body2" color="text.secondary">
          The product you are looking for does not exist
        </Typography>

        <StyledBackToCatalogButton variant="contained" href="/catalog">
          Back to catalog
        </StyledBackToCatalogButton>
      </StyledPageContainer>
    );

  const hasDiscount = product.discountPercentage >= 10;
  const { oldPrice } = product;
  const displayImage = selectedImage ?? product.images?.[0] ?? product.thumbnail;
  // Keep CTA link valid when category is missing
  const categoryLink = product?.category
    ? `/catalog?category=${encodeURIComponent(product.category)}`
    : '/catalog';

  return (
    <Fragment>
      <StyledPageContainer>
        <StyledProductLayout>
          <ProductGallery
            images={product.images ?? []}
            selectedImage={selectedImage}
            onSelect={setSelectedImage}
            displayImage={displayImage}
            discountPercentage={product.discountPercentage ?? 0}
            productTitle={product.title}
          />

          <StyledInfoColumn>
            <ProductInfo product={product} hasDiscount={hasDiscount} oldPrice={oldPrice} />
            <ProductActions
              quantity={quantity}
              increase={increase}
              decrease={decrease}
              onAdd={handleAdd}
              onBuyNow={handleBuyNow}
            />
          </StyledInfoColumn>
        </StyledProductLayout>

        {related.length > 0 && <RelatedProducts related={related} categoryLink={categoryLink} />}
      </StyledPageContainer>
    </Fragment>
  );
};

export default ProductPage;
