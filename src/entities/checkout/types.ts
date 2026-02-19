// Item shape expected by checkout calculations
export interface CheckoutItem {
  id: string;
  title?: string;
  price: number;
  quantity: number;
  thumbnail?: string;
}

// Form values sent from the checkout page
export interface CheckoutFormData {
  name: string;
  phone: string;
  city: string;
  street: string;
  zip: string;
  payment: string;
  delivery: 'standard' | 'express';
  notes?: string;
}

// Summary produced by checkout calculations
export interface CheckoutSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

// Payload persisted to the orders collection
export interface CheckoutPayload {
  userId: string | null;
  items: CheckoutItem[];
  paymentMethod: string;
  deliveryMethod: CheckoutFormData['delivery'];
  address: {
    street: string;
    city: string;
    zip: string;
  };
  notes: string;
  summary: CheckoutSummary;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  discount: number;
  status: string;
  createdAt: ReturnType<typeof import('firebase/firestore').serverTimestamp>;
}

// Outcome returned by processCheckout
export interface CheckoutResult {
  success: boolean;
  orderId?: string | null;
  errors?: Record<string, string>;
}

// Payload used by API services (mirrors CheckoutPayload)
export type CheckoutPayloadForApi = Omit<CheckoutPayload, 'createdAt'> & {
  createdAt: string;
};

// Firestore helpers injected for easier testing
export interface CheckoutDependencies {
  addDocFn: typeof import('firebase/firestore').addDoc;
  collectionFn: typeof import('firebase/firestore').collection;
  timestampFn: typeof import('firebase/firestore').serverTimestamp;
  dbClient: import('firebase/firestore').Firestore;
}
