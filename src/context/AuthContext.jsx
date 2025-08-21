import { createContext, useContext } from "react";
import { useAuthListener } from "../hooks/useAuthListener";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const value = useAuthListener(); // get user + loading from listener

    return (
        <AuthContext.Provider value={value}>
            {/* provide auth state to all components */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); // custom hook for consuming auth
