import { Routes, Route, Link } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";

const App = () => {
    return (
        <>
            {/* Simple navigation menu */}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
            </nav>

            {/* Application routes */}
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
        </>
    );
};

export default App;
