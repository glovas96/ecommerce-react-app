import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { selectCartItems, selectCartTotal } from '@/entities/cart/selectors/cartSelectors';
import { clearCart } from '@/entities/cart/slices/cartSlice';
import type { CartItem } from '@/entities/cart/types';
import { processCheckout } from '@/entities/checkout/services/checkoutService';
import type {
  CheckoutFormData as CheckoutPayloadData,
  CheckoutItem,
} from '@/entities/checkout/types';
import CheckoutAddress from '@/features/checkout/ui/CheckoutAddress';
import { StyledCheckoutContent, StyledSectionDivider } from '@/features/checkout/ui/checkoutStyles';
import DeliveryOptions from '@/features/checkout/ui/DeliveryOptions';
import OrderSummary from '@/features/checkout/ui/OrderSummary';
import PaymentOptions from '@/features/checkout/ui/PaymentOptions';
import ReviewItems from '@/features/checkout/ui/ReviewItems';
import { useAuth } from '@/shared/hooks/useAuth';
import type { AppDispatch } from '@/shared/store';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';
import FullPageLoader from '@/shared/ui/FullPageLoader';
import { checkoutSchema } from '@/shared/validation/checkoutSchema';
import type { CheckoutFormFields } from '@/shared/validation/checkoutSchema.types';

type LocationState = {
  singleItem?: CartItem;
};

// Convert cart item to checkout payload shape.
const toCheckoutItem = (item: CartItem): CheckoutItem => ({
  id: String(item.id),
  thumbnail: item.thumbnail,
  title: item.title,
  price: item.price,
  quantity: item.quantity,
});

const CheckoutPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  // Read Buy Now item (if exists via query or state)
  const params = new URLSearchParams(location.search);
  const pendingBuyNow = params.get('pendingBuyNow');
  const buyNowItem: CartItem | null = pendingBuyNow
    ? (() => {
        try {
          return JSON.parse(decodeURIComponent(pendingBuyNow)) as CartItem;
        } catch {
          return null;
        }
      })()
    : null;
  const singleItem =
    buyNowItem ?? (location.state as LocationState | undefined)?.singleItem ?? null;

  // Select items depending on checkout mode
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const items: CartItem[] = singleItem ? [singleItem] : cartItems;
  const checkoutItems = items.map(toCheckoutItem);

  // Determine checkout totals per mode
  const itemTotal = singleItem ? singleItem.price * singleItem.quantity : cartTotal;

  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<CheckoutPayloadData['payment']>('card');
  const [delivery, setDelivery] = useState<CheckoutPayloadData['delivery']>('standard');
  const [serverError, setServerError] = useState('');

  const shippingCost = delivery === 'express' ? 5 : 0;
  const taxAmount = itemTotal * 0.08;
  const summaryTotal = itemTotal + shippingCost + taxAmount;

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormFields>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  });

  // Submit handler
  const onSubmit = async (data: CheckoutFormFields) => {
    if (!user) {
      navigate('/login?redirectTo=/checkout');
      return;
    }

    setLoading(true);
    setServerError('');
    const payload: CheckoutPayloadData = { ...data, payment, delivery };
    const result = await processCheckout(checkoutItems, payload, user);
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
    return <FullPageLoader />;
  }

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
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
          <PaymentOptions
            payment={payment}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPayment(event.target.value as CheckoutPayloadData['payment'])
            }
          />
        </Box>

        <StyledSectionDivider />

        <Box>
          <DeliveryOptions
            delivery={delivery}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDelivery(event.target.value as CheckoutPayloadData['delivery'])
            }
          />
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
  );
};

export default CheckoutPage;
