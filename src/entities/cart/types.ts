import type { Firestore } from 'firebase/firestore';

import type { Product } from '@/entities/product/types';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  hydrated: boolean;
}

export interface CartSummary {
  subtotal: number;
  originalTotal: number;
  discount: number;
  total: number;
  count: number;
}

export interface CartDependencies {
  docFn: typeof import('firebase/firestore').doc;
  getDocFn: typeof import('firebase/firestore').getDoc;
  setDocFn: typeof import('firebase/firestore').setDoc;
  dbClient: Firestore;
}

export interface CartSyncDependencies {
  auth: { currentUser: { uid: string } | null };
  storage: Storage;
  delay: (ms: number) => Promise<void>;
  loadUserCart: (userId: string) => Promise<CartItem[]>;
  saveUserCart: (userId: string, items: CartItem[]) => Promise<void>;
  mergeCarts: (guest: CartItem[], user: CartItem[]) => CartItem[];
}
