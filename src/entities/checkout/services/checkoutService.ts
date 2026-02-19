import {
  addDoc as defaultAddDoc,
  collection as defaultCollection,
  serverTimestamp as defaultServerTimestamp,
} from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

import type {
  CheckoutDependencies,
  CheckoutFormData,
  CheckoutItem,
  CheckoutPayload,
  CheckoutResult,
  CheckoutSummary,
} from '@/entities/checkout/types';
import { db as defaultDb } from '@/shared/firebase/config';

// Determine shipping cost for delivery options
export const getShippingCost = (delivery: CheckoutFormData['delivery'] = 'standard'): number =>
  delivery === 'express' ? 5 : 0;

// Build price breakdown for checkout
export const buildSummary = (
  items: CheckoutItem[],
  delivery: CheckoutFormData['delivery'] = 'standard',
): CheckoutSummary => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = getShippingCost(delivery);
  const tax = subtotal * 0.08;
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
};

// Create payload sent to Firestore
export const buildPayload = (
  items: CheckoutItem[],
  formData: CheckoutFormData,
  user: { uid?: string } | null,
  { timestampFn = defaultServerTimestamp }: Partial<CheckoutDependencies> = {},
): CheckoutPayload => {
  const summary = buildSummary(items, formData.delivery);
  return {
    userId: user?.uid ?? null,
    items,
    paymentMethod: formData.payment,
    deliveryMethod: formData.delivery,
    address: {
      street: formData.street,
      city: formData.city,
      zip: formData.zip,
    },
    notes: formData.notes ?? '',
    summary,
    subtotal: summary.subtotal,
    shipping: summary.shipping,
    tax: summary.tax,
    total: summary.total,
    discount: 0,
    status: 'processing',
    createdAt: timestampFn(),
  };
};

const defaultCheckoutDependencies: CheckoutDependencies = {
  addDocFn: defaultAddDoc,
  collectionFn: defaultCollection,
  timestampFn: defaultServerTimestamp,
  dbClient: defaultDb as Firestore,
};

// Submit checkout and return outcome
export const processCheckout = async (
  items: CheckoutItem[],
  formData: CheckoutFormData,
  user: { uid?: string } | null,
  overrides: Partial<CheckoutDependencies> = {},
): Promise<CheckoutResult> => {
  const { addDocFn, collectionFn, timestampFn, dbClient } = {
    ...defaultCheckoutDependencies,
    ...overrides,
  };
  const payload = buildPayload(items, formData, user, { timestampFn });
  try {
    const docRef = await addDocFn(collectionFn(dbClient, 'orders'), payload);
    return {
      success: true,
      orderId: docRef.id,
      errors: {},
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      orderId: null,
      errors: { general: message },
    };
  }
};
