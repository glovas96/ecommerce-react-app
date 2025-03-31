import { Routes, Route, Link } from "react-router-dom";

const App = () => {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
            </nav>

            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/catalog" element={<div>Catalog</div>} />
            </Routes>
        </>
    );
};

export default App;
