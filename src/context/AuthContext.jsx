import { createContext, useContext } from "react";
import { useAuthListener } from "../hooks/useAuthListener";

const AuthContext = createContext(null); // global auth context

export const AuthProvider = ({ children }) => {
    const value = useAuthListener(); // get user + loading from listener

    return (
        <AuthContext.Provider value={value}>
            {children} {/* provide auth state to all components */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); // custom hook for consuming auth
