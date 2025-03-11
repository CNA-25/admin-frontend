// Admin Frontend login page
import React from "react";
import { Navigate } from "react-router-dom";
import Redirect from "../components/common/Redirect";

const Logout = () => {

    const token = localStorage.getItem('access_token');
    
    if (token) {
        // Remove access token from storage
        localStorage.removeItem('access_token');
        console.log("Token removed, navigating to login page...")
    }

    return (
        <div>
            <Navigate to="/login" replace />
            <div id="title-container">
                <h1>Trying to sign out...</h1>   
            </div>
        </div>
    );
};

export default Logout;