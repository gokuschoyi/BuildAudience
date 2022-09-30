import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = sessionStorage.getItem('userTokenSession')
    const isAuthenticated = sessionStorage.getItem('userTokenSession')

    if (isAuthenticated === null && token === null) {
        return <Navigate to="/Auth" replace />
    }
    return children;
}

export default ProtectedRoute;