import { Routes, Route, Link } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";

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
            </Routes>
        </>
    );
};

export default App;
