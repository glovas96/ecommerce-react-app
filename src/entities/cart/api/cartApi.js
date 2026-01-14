import { doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from '@/shared/firebase/config';

// Load user cart from Firestore
export const loadUserCart = async (userId) => {
  const ref = doc(db, 'carts', userId);
  const snap = await getDoc(ref);
  const items = snap.exists() ? snap.data().items : [];
  return items;
};

// Save user cart to Firestore
export const saveUserCart = async (userId, items) => {
  const ref = doc(db, 'carts', userId);
  await setDoc(ref, { items });
};
