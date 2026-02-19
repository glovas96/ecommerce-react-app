import type { AnyAction, EnhancedStore } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import type { Reducer } from 'redux';

import cartReducer from '@/entities/cart/slices/cartSlice';
import type { CartState } from '@/entities/cart/types';

type RootState = {
  cart: CartState;
};

type PartialRootState = Partial<RootState>;

export const createTestStore = (preloadedState?: PartialRootState): EnhancedStore<RootState> =>
  configureStore({
    reducer: {
      cart: cartReducer as Reducer<CartState, AnyAction, CartState | undefined>,
    },
    preloadedState,
  });

export interface RenderWithProvidersOptions extends RenderOptions {
  preloadedState?: PartialRootState;
  store?: EnhancedStore<RootState>;
}

export const renderWithProviders = (ui: ReactElement, options: RenderWithProvidersOptions = {}) => {
  const { preloadedState, store = createTestStore(preloadedState), ...renderOptions } = options;
  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>,
      renderOptions,
    ),
  };
};
