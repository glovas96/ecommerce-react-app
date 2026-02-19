import { Typography } from '@mui/material';
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

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, related, selectedImage, setSelectedImage, quantity, increase, decrease } =
    useProductDetails();

  // Dispatch cart addition
  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity,
        discountPercentage: product.discountPercentage ?? 0,
        rating: product.rating ?? 0,
        category: product.category ?? '',
        images: product.images ?? [],
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
      rating: product.rating ?? 0,
      category: product.category ?? '',
      images: product.images ?? [],
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

  const displayImage = (selectedImage ?? product.images?.[0] ?? product.thumbnail ?? '') as string;
  // Keep CTA link valid when category is missing
  const categoryLink = product?.category
    ? `/catalog?category=${encodeURIComponent(product.category)}`
    : '/catalog';

  return (
    <>
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
            <ProductInfo product={product} />
            <ProductActions
              quantity={quantity}
              increase={increase}
              decrease={decrease}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </StyledInfoColumn>
        </StyledProductLayout>

        {related.length > 0 && <RelatedProducts related={related} categoryLink={categoryLink} />}
      </StyledPageContainer>
    </>
  );
};

export default ProductPage;
