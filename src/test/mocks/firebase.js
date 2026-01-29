import { vi } from 'vitest';

const auth = {
  currentUser: null,
  onAuthStateChanged: vi.fn(() => () => {}),
};

// Basic Firestore primitives
const db = {};
const collection = vi.fn(() => ({ path: 'orders' }));
const addDoc = vi.fn(async () => ({ id: 'mock-order-id' }));
const serverTimestamp = vi.fn(() => ({ _mockTimestamp: true }));

const loadUserCart = vi.fn(async () => []);
const saveUserCart = vi.fn(async () => null);

export const firebaseMocks = {
  auth,
  db,
  collection,
  addDoc,
  serverTimestamp,
  loadUserCart,
  saveUserCart,
};

export const resetFirebaseMocks = () => {
  collection.mockReset();
  addDoc.mockReset();
  serverTimestamp.mockReset();
  loadUserCart.mockReset();
  saveUserCart.mockReset();
  auth.onAuthStateChanged.mockReset();
  auth.currentUser = null;
};

export const setFirebaseUser = (user) => {
  auth.currentUser = user;
};

export default firebaseMocks;
