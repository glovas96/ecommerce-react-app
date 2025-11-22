import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FullPageLoader from "./FullPageLoader";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth(); // auth state

    if (loading) return <FullPageLoader />; // waiting for auth

    if (!user) return <Navigate to="/login" replace />; // redirect if not logged in

    return children; // allow access
};

export default ProtectedRoute;
