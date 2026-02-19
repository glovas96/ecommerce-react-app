import type { CheckoutPayloadForApi } from '@/entities/checkout/types';

// Submit the checkout payload
export const submitCheckout = async (
  payload: CheckoutPayloadForApi,
): Promise<{ success: boolean; orderId: string }> => {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
};
