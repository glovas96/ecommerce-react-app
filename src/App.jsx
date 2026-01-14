import { Routes, Route } from 'react-router-dom';

import { useCartSync } from '@/entities/cart/hooks/useCartSync';
import CartPage from '@/pages/CartPage';
import CatalogPage from '@/pages/CatalogPage';
import CheckoutPage from '@/pages/CheckoutPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import OrderDetailsPage from '@/pages/OrderDetailsPage';
import OrdersListPage from '@/pages/OrdersListPage';
import ProductPage from '@/pages/ProductPage.jsx';
import RegisterPage from '@/pages/RegisterPage';
import ProtectedRoute from '@/shared/routes/ProtectedRoute';
import Navigation from '@/widgets/navigation/Navigation';

const App = () => {
  useCartSync();

  return (
    <>
      {/* MUI Navigation */}
      <Navigation />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
