// Global redirect component
import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const Redirect = ({ children }) => {
    const token = localStorage.getItem('access_token');

    // Check if token exists in localStorage
    if (!token) {
        return <Navigate to="/logout" replace />;
    } else {
        try {
            // Decode JWT data
            const decodedToken = jwtDecode(token);
            // Check if role is admin or user
            if (decodedToken.role !== "admin") {
                console.log(`Authorization error: Insufficient access rights`);
                // Redirect to login page
                console.log("Redirect: Navigating to login page...")
                return <Navigate to="/logout" replace />
            }
            // Return when token is valid and has admin role
            return children;
        } catch (error) {
            console.error("Error decoding token: ", error.message);
            return <Navigate to="/logout" replace />
        }

    }

    
}

export default Redirect;