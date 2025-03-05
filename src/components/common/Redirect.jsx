// Global redirect component
import React from "react";
import { Navigate } from "react-router-dom";

const Redirect = ({ children }) => {
    const token = localStorage.getItem('access_token');

    // Check if token exists in localStorage
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default Redirect;