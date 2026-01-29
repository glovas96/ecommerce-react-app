import {
  addDoc as defaultAddDoc,
  collection as defaultCollection,
  serverTimestamp as defaultServerTimestamp,
} from 'firebase/firestore';

import { db as defaultDb } from '@/shared/firebase/config';

// Determine shipping cost for delivery options
export const getShippingCost = (delivery = 'standard') => (delivery === 'express' ? 5 : 0);

// Build price breakdown for checkout
export const buildSummary = (items, delivery = 'standard') => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = getShippingCost(delivery);
  const tax = subtotal * 0.08;
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
};

// Create payload sent to Firestore
export const buildPayload = (
  items,
  formData,
  user,
  { timestampFn = defaultServerTimestamp } = {},
) => {
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

const defaultCheckoutDependencies = {
  addDocFn: defaultAddDoc,
  collectionFn: defaultCollection,
  timestampFn: defaultServerTimestamp,
  dbClient: defaultDb,
};

// Submit checkout and return outcome
export const processCheckout = async (items, formData, user, overrides = {}) => {
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
    return {
      success: false,
      orderId: null,
      errors: { general: error.message },
    };
  }
};
