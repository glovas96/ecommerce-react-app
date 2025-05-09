import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* Provide Redux store to the entire app */}
        <Provider store={store}>
            {/* Enable client-side routing */}
            <BrowserRouter>
                {/* Auth context */}
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);

