import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { selectCartItems, selectCartTotal } from '@/entities/cart/selectors/cartSelectors';
import { clearCart } from '@/entities/cart/slices/cartSlice';
import { processCheckout } from '@/entities/checkout/services/checkoutService';
import CheckoutPage from '@/pages/CheckoutPage';
import { useAuth } from '@/shared/hooks/useAuth';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();
const mockEnqueue = vi.fn();
const cartItems = [{ id: 'cart1', price: 10, quantity: 2 }];
const mockedProcessCheckout = vi.mocked(processCheckout);

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector) =>
    selector === selectCartItems ? cartItems : selector === selectCartTotal ? 20 : undefined,
}));
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ search: '', state: {} }),
}));
vi.mock('@/shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));
vi.mock('notistack', () => ({
  useSnackbar: () => ({ enqueueSnackbar: mockEnqueue }),
}));
vi.mock('@/entities/checkout/services/checkoutService', () => ({
  processCheckout: vi.fn(),
}));
vi.mock('@/shared/ui/FullPageLoader', () => {
  const FullPageLoaderMock = () => <div>Loading</div>;
  FullPageLoaderMock.displayName = 'FullPageLoaderMock';
  return { default: FullPageLoaderMock };
});
vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: (cb) => cb,
    formState: { errors: {} },
  }),
}));
vi.mock('@/features/checkout/ui/CheckoutAddress', () => {
  const CheckoutAddressMock = ({ onSubmit }) => (
    <button type="button" data-testid="checkout-address" onClick={onSubmit}>
      Submit address
    </button>
  );
  CheckoutAddressMock.displayName = 'CheckoutAddressMock';
  return { default: CheckoutAddressMock };
});
vi.mock('@/features/checkout/ui/PaymentOptions', () => {
  const PaymentOptionsMock = ({ payment, onChange }) => (
    <select data-testid="payment-options" value={payment} onChange={onChange}>
      <option value="card">Card</option>
      <option value="cash">Cash</option>
    </select>
  );
  PaymentOptionsMock.displayName = 'PaymentOptionsMock';
  return { default: PaymentOptionsMock };
});
vi.mock('@/features/checkout/ui/DeliveryOptions', () => {
  const DeliveryOptionsMock = ({ delivery, onChange }) => (
    <select data-testid="delivery-options" value={delivery} onChange={onChange}>
      <option value="standard">Standard</option>
      <option value="express">Express</option>
    </select>
  );
  DeliveryOptionsMock.displayName = 'DeliveryOptionsMock';
  return { default: DeliveryOptionsMock };
});
vi.mock('@/features/checkout/ui/ReviewItems', () => {
  const ReviewItemsMock = () => <div>Review items</div>;
  ReviewItemsMock.displayName = 'ReviewItemsMock';
  return { default: ReviewItemsMock };
});
vi.mock('@/features/checkout/ui/OrderSummary', () => {
  const OrderSummaryMock = ({ onPlaceOrder, loading }) => (
    <button
      type="button"
      data-testid="place-order"
      onClick={() => onPlaceOrder()}
      disabled={loading}
    >
      Place order
    </button>
  );
  OrderSummaryMock.displayName = 'OrderSummaryMock';
  return { default: OrderSummaryMock };
});

const mockUseAuth = vi.mocked(useAuth);

beforeEach(() => {
  mockDispatch.mockClear();
  mockNavigate.mockClear();
  mockEnqueue.mockClear();
  mockedProcessCheckout.mockClear();
  mockUseAuth.mockReset();
});

describe('CheckoutPage', () => {
  it('shows loader while auth is loading', () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true });
    render(
      <React.Fragment>
        <MemoryRouter>
          <CheckoutPage />
        </MemoryRouter>
      </React.Fragment>,
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('navigates to login when user is missing', () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false });
    render(
      <React.Fragment>
        <MemoryRouter>
          <CheckoutPage />
        </MemoryRouter>
      </React.Fragment>,
    );

    fireEvent.click(screen.getByTestId('place-order'));
    expect(mockNavigate).toHaveBeenCalledWith('/login?redirectTo=/checkout');
    expect(mockedProcessCheckout).not.toHaveBeenCalled();
  });

  it('submits checkout and clears cart on success', async () => {
    mockUseAuth.mockReturnValue({ user: { uid: 'user-1' }, loading: false });
    mockedProcessCheckout.mockResolvedValue({ success: true });

    render(
      <React.Fragment>
        <MemoryRouter>
          <CheckoutPage />
        </MemoryRouter>
      </React.Fragment>,
    );

    fireEvent.click(screen.getByTestId('place-order'));

    await waitFor(() => expect(mockedProcessCheckout).toHaveBeenCalled());
    expect(mockedProcessCheckout).toHaveBeenCalledWith(
      cartItems,
      expect.objectContaining({ payment: 'card', delivery: 'standard' }),
      { uid: 'user-1' },
    );
    expect(mockDispatch).toHaveBeenCalledWith(clearCart());
    expect(mockNavigate).toHaveBeenCalledWith('/orders');
  });
});
