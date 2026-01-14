import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { db } from '@/shared/firebase/config';

// Determine shipping cost based on delivery type
const getShippingCost = (delivery = 'standard') => (delivery === 'express' ? 5 : 0);

// Build checkout summary
const buildSummary = (items, delivery = 'standard') => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = getShippingCost(delivery);
  const tax = subtotal * 0.08;
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
};

// Build payload from form data
const buildPayload = (items, formData, user) => {
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
    createdAt: serverTimestamp(),
  };
};

// Submit checkout and return outcome
export const processCheckout = async (items, formData, user) => {
  const payload = buildPayload(items, formData, user);
  try {
    const docRef = await addDoc(collection(db, 'orders'), payload);
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
