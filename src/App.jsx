import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";

import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
    const { user } = useAuth(); // current user

    return (
        <>
            {/* Navigation */}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
                <Link to="/cart">Cart</Link>

                {user ? (
                    <>
                        <span>{user.email}</span>
                        <button onClick={() => signOut(auth)}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />

                {/* Auth pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </>
    );
};

export default App;
