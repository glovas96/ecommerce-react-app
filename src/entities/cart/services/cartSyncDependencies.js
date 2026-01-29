import {
  saveUserCart as defaultSaveUserCart,
  loadUserCart as defaultLoadUserCart,
} from '@/entities/cart/api/cartApi';
import { mergeCarts as defaultMergeCarts } from '@/entities/cart/services/mergeCarts';
import { auth as defaultAuth } from '@/shared/firebase/config';

const createDefaultStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
    return globalThis.localStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
};

const createDefaultDependencies = () => ({
  auth: defaultAuth,
  storage: createDefaultStorage(),
  delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  loadUserCart: defaultLoadUserCart,
  saveUserCart: defaultSaveUserCart,
  mergeCarts: defaultMergeCarts,
});

let dependencies = createDefaultDependencies();

export const overrideCartSyncDependencies = (overrides) => {
  dependencies = { ...dependencies, ...overrides };
};

export const resetCartSyncDependencies = () => {
  dependencies = createDefaultDependencies();
};

export const getDeps = () => dependencies;
