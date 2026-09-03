import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles = ['admin'], children}) => {
    const {user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center-items-center h-screen">
                <div className="animate-spin-rounded-full h-12 w-12border-b-2 border-blue-600"></div>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return children ? children: <Outlet />
};

export default ProtectedRoute;