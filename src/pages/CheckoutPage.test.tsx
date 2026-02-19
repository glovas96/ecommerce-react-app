import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import type { ChangeEventHandler } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { selectCartItems, selectCartTotal } from '@/entities/cart/selectors/cartSelectors';
import { clearCart } from '@/entities/cart/slices/cartSlice';
import type { CartItem } from '@/entities/cart/types';
import { processCheckout } from '@/entities/checkout/services/checkoutService';
import type { CheckoutItem } from '@/entities/checkout/types';
import CheckoutPage from '@/pages/CheckoutPage';
import type { AuthContextValue } from '@/shared/context/authContext.types';
import { useAuth } from '@/shared/hooks/useAuth';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();
const mockEnqueue = vi.fn();
const mockLogout = vi.fn();
const cartItems: CartItem[] = [
  {
    id: 1,
    title: 'Item',
    price: 10,
    quantity: 2,
    rating: 4,
    discountPercentage: 0,
    category: 'test',
    thumbnail: 'test.png',
    images: ['test.png'],
  },
];
const checkoutItems: CheckoutItem[] = cartItems.map((item) => ({
  id: String(item.id),
  thumbnail: item.thumbnail,
  title: item.title,
  price: item.price,
  quantity: item.quantity,
}));
const mockedProcessCheckout = vi.mocked(processCheckout);

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: unknown) => unknown) =>
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
    handleSubmit: (cb: (...args: unknown[]) => unknown) => cb,
    formState: { errors: {} },
  }),
}));
vi.mock('@/features/checkout/ui/CheckoutAddress', () => {
  const CheckoutAddressMock = ({ onSubmit }: { onSubmit: () => void }) => (
    <button type="button" data-testid="checkout-address" onClick={onSubmit}>
      Submit address
    </button>
  );
  CheckoutAddressMock.displayName = 'CheckoutAddressMock';
  return { default: CheckoutAddressMock };
});
vi.mock('@/features/checkout/ui/PaymentOptions', () => {
  const PaymentOptionsMock = ({
    payment,
    onChange,
  }: {
    payment: string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
  }) => (
    <select data-testid="payment-options" value={payment} onChange={onChange}>
      <option value="card">Card</option>
      <option value="cash">Cash</option>
    </select>
  );
  PaymentOptionsMock.displayName = 'PaymentOptionsMock';
  return { default: PaymentOptionsMock };
});
vi.mock('@/features/checkout/ui/DeliveryOptions', () => {
  const DeliveryOptionsMock = ({
    delivery,
    onChange,
  }: {
    delivery: string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
  }) => (
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
  const OrderSummaryMock = ({
    onPlaceOrder,
    loading,
  }: {
    onPlaceOrder: () => void;
    loading: boolean;
  }) => (
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

const baseAuthValue: AuthContextValue = {
  user: null,
  loading: false,
  logout: mockLogout,
  cartSyncing: false,
  cartReady: true,
};

beforeEach(() => {
  mockDispatch.mockClear();
  mockNavigate.mockClear();
  mockEnqueue.mockClear();
  mockedProcessCheckout.mockClear();
  mockLogout.mockClear();
  mockUseAuth.mockReset();
});

describe('CheckoutPage', () => {
  it('shows loader while auth is loading', () => {
    mockUseAuth.mockReturnValue({ ...baseAuthValue, loading: true });
    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('navigates to login when user is missing', () => {
    mockUseAuth.mockReturnValue({ ...baseAuthValue, loading: false });
    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId('place-order'));
    expect(mockNavigate).toHaveBeenCalledWith('/login?redirectTo=/checkout');
    expect(mockedProcessCheckout).not.toHaveBeenCalled();
  });

  it('submits checkout and clears cart on success', async () => {
    mockUseAuth.mockReturnValue({
      ...baseAuthValue,
      user: { uid: 'user-1', email: 'user@example.com', name: 'Test User', roles: [] },
    });
    mockedProcessCheckout.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId('place-order'));

    await waitFor(() => expect(mockedProcessCheckout).toHaveBeenCalled());
    expect(mockedProcessCheckout).toHaveBeenCalledWith(
      checkoutItems,
      expect.objectContaining({ payment: 'card', delivery: 'standard' }),
      expect.objectContaining({
        uid: 'user-1',
        email: 'user@example.com',
        name: 'Test User',
        roles: [],
      }),
    );
    expect(mockDispatch).toHaveBeenCalledWith(clearCart());
    expect(mockNavigate).toHaveBeenCalledWith('/orders');
  });
});
