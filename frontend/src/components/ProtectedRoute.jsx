import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();

    if (!auth?.accessToken) {
        // Not authenticated, redirect to login page
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
