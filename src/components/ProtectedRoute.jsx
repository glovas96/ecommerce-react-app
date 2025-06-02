import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth(); // auth state

    if (loading) return <div>Loading...</div>; // waiting for authgit log --oneline

    if (!user) return <Navigate to="/login" replace />; // redirect if not logged in

    return children; // allow access
};

export default ProtectedRoute;
