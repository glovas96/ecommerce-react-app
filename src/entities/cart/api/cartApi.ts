import {
  doc as defaultDoc,
  getDoc as defaultGetDoc,
  setDoc as defaultSetDoc,
} from 'firebase/firestore';

import type { CartDependencies, CartItem } from '@/entities/cart/types';
import { db as defaultDb } from '@/shared/firebase/config';

const createDefaultDependencies = (): CartDependencies => ({
  docFn: defaultDoc,
  getDocFn: defaultGetDoc,
  setDocFn: defaultSetDoc,
  dbClient: defaultDb,
});

let dependencies = createDefaultDependencies();

export const overrideCartApiDependencies = (overrides: Partial<CartDependencies>) => {
  dependencies = { ...dependencies, ...overrides };
};

export const resetCartApiDependencies = () => {
  dependencies = createDefaultDependencies();
};

const getDeps = () => dependencies;

export const loadUserCart = async (userId: string | null): Promise<CartItem[]> => {
  if (!userId) return [];
  const { docFn, getDocFn, dbClient } = getDeps();
  const ref = docFn(dbClient, 'carts', userId);
  const snap = await getDocFn(ref);
  return snap.exists() ? (snap.data().items as CartItem[]) : [];
};

export const saveUserCart = async (userId: string | null, items: CartItem[]): Promise<void> => {
  if (!userId) return;
  const { docFn, setDocFn, dbClient } = getDeps();
  const ref = docFn(dbClient, 'carts', userId);
  await setDocFn(ref, { items });
};
