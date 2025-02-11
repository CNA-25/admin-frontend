// Admin Frontend login page
import React from "react";
import LoginForm from "../components/page-specific/LoginForm";

const Login = () => {

    return (
        <div>
            <div id="title-container">
                <h1>Brewmaster</h1>
                <h2>Webshop Administration System</h2>   
            </div>
        <LoginForm />
            
            
        </div>
    );
};

export default Login;