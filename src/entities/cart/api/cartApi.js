import {
  doc as defaultDoc,
  getDoc as defaultGetDoc,
  setDoc as defaultSetDoc,
} from 'firebase/firestore';

import { db as defaultDb } from '@/shared/firebase/config';

const createDefaultDependencies = () => ({
  docFn: defaultDoc,
  getDocFn: defaultGetDoc,
  setDocFn: defaultSetDoc,
  dbClient: defaultDb,
});

let dependencies = createDefaultDependencies();

export const overrideCartApiDependencies = (overrides) => {
  dependencies = { ...dependencies, ...overrides };
};

export const resetCartApiDependencies = () => {
  dependencies = createDefaultDependencies();
};

const getDeps = () => dependencies;

// Load user cart from Firestore
export const loadUserCart = async (userId) => {
  const { docFn, getDocFn, dbClient } = getDeps();
  const ref = docFn(dbClient, 'carts', userId);
  const snap = await getDocFn(ref);
  const items = snap.exists() ? snap.data().items : [];
  return items;
};

// Save user cart to Firestore
export const saveUserCart = async (userId, items) => {
  const { docFn, setDocFn, dbClient } = getDeps();
  const ref = docFn(dbClient, 'carts', userId);
  await setDocFn(ref, { items });
};
