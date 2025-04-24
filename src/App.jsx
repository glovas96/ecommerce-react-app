import { Routes, Route, Link } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";


const App = () => {
    return (
        <>
            {/* Simple navigation menu */}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
                <Link to="/cart">Cart</Link>
            </nav>

            {/* Application routes */}
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </>
    );
};

export default App;
