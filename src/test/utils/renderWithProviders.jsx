import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import cartReducer from '@/entities/cart/slices/cartSlice';

// Render helper that wires store + router
export const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });

export const renderWithProviders = (ui, options = {}) => {
  const {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  } = options;
  return {
    store,
    ...render(
      <React.Fragment>
        <Provider store={store}>
          <BrowserRouter>{ui}</BrowserRouter>
        </Provider>
      </React.Fragment>,
      renderOptions,
    ),
  };
};
