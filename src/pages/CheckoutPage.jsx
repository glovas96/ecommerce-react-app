import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { selectCartItems, selectCartTotal } from '@/entities/cart/selectors/cartSelectors';
import { clearCart } from '@/entities/cart/slices/cartSlice';
import { processCheckout } from '@/entities/checkout/services/checkoutService';
import CheckoutAddress from '@/features/checkout/ui/CheckoutAddress';
import { StyledCheckoutContent, StyledSectionDivider } from '@/features/checkout/ui/checkoutStyles';
import DeliveryOptions from '@/features/checkout/ui/DeliveryOptions';
import OrderSummary from '@/features/checkout/ui/OrderSummary';
import PaymentOptions from '@/features/checkout/ui/PaymentOptions';
import ReviewItems from '@/features/checkout/ui/ReviewItems';
import { useAuth } from '@/shared/hooks/useAuth';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';
import FullPageLoader from '@/shared/ui/FullPageLoader';
import { checkoutSchema } from '@/shared/validation/checkoutSchema';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  // Read Buy Now item (if exists via query or state)
  const params = new URLSearchParams(location.search);
  const pendingBuyNow = params.get('pendingBuyNow');
  let buyNowItem = null;
  if (pendingBuyNow) {
    try {
      buyNowItem = JSON.parse(decodeURIComponent(pendingBuyNow));
    } catch {
      buyNowItem = null;
    }
  }
  const singleItem = buyNowItem ?? location.state?.singleItem ?? null;

  // Select items depending on checkout mode
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // Final items for checkout
  const items = singleItem ? [singleItem] : cartItems;
  // Determine checkout totals per mode
  const itemTotal = singleItem ? singleItem.price * singleItem.quantity : cartTotal;

  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState('card');
  const [delivery, setDelivery] = useState('standard');
  const [serverError, setServerError] = useState('');

  const shippingCost = delivery === 'express' ? 5 : 0;
  const taxAmount = itemTotal * 0.08;
  const summaryTotal = itemTotal + shippingCost + taxAmount;

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  });

  // Submit handler
  const onSubmit = async (data) => {
    if (!user) {
      navigate('/login?redirectTo=/checkout');
      return;
    }

    setLoading(true);
    setServerError('');
    const payload = { ...data, payment, delivery };
    const result = await processCheckout(items, payload, user);
    setLoading(false);

    if (result.success) {
      enqueueSnackbar('Order placed successfully.', { variant: 'success' });
      if (!singleItem) {
        dispatch(clearCart());
      }
      navigate('/orders');
      return;
    }

    if (result.errors?.general) {
      enqueueSnackbar(result.errors.general, { variant: 'error' });
    } else {
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    }
  };

  if (authLoading) {
    return (
      <React.Fragment>
        <FullPageLoader />
      </React.Fragment>
    );
  }

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <React.Fragment>
      <StyledPageContainer>
        <StyledCheckoutContent>
          <Typography variant="h4" gutterBottom>
            Place your order
          </Typography>

          <Box>
            <CheckoutAddress
              register={register}
              errors={errors}
              serverError={serverError}
              onSubmit={handleFormSubmit}
            />
          </Box>

          <StyledSectionDivider />

          <Box>
            <PaymentOptions payment={payment} onChange={(e) => setPayment(e.target.value)} />
          </Box>

          <StyledSectionDivider />

          <Box>
            <DeliveryOptions delivery={delivery} onChange={(e) => setDelivery(e.target.value)} />
          </Box>

          <StyledSectionDivider />

          <Box>
            <ReviewItems items={items} />
          </Box>

          <StyledSectionDivider />

          <Box>
            <OrderSummary
              itemTotal={itemTotal}
              shippingCost={shippingCost}
              taxAmount={taxAmount}
              summaryTotal={summaryTotal}
              onPlaceOrder={handleFormSubmit}
              loading={loading}
            />
          </Box>
        </StyledCheckoutContent>
      </StyledPageContainer>
    </React.Fragment>
  );
};

export default CheckoutPage;
