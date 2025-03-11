import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../style/LoginForm.css"

// Based on GeeksForGeeks tutorial: Basic Registration and Login Form Using React Hook Form
// https://www.geeksforgeeks.org/react-hook-form-create-basic-reactjs-registration-and-login-form/

// Login form
function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const API_URL = 'https://user-service-api-user-service.2.rahtiapp.fi/login';
  const onSubmit = async (data) => {

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });
      const respData = await resp.json();

      if (resp.ok) {
        const token = respData.access_token;
        const decodedToken = jwtDecode(token);

        if (decodedToken.role === "user") {
          alert("Unauthorized: This user login is not allowed on this frontend.");
          return;
        }


        // Save JWT to localStorage
        localStorage.setItem('access_token', respData.access_token);

        // Navigate to home page
        navigate('/', { replace: true });
        
      }
    } catch (error) {
      alert(`An error when attempting to sign in: ${error.message}`);
      console.error(error.message);
    }
  }

  // Form UI
  return (
    <>
      <div className="loginCard">
        <p className="title">Sign in</p>
        <form className="Login" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="loginEmail">Email</label>
          <input type="email" name="loginEmail" {...register("email", { required: true })} />
          {errors.email && <span style={{ color: "red" }}>Email is required.</span>}
          <label htmlFor="loginPassword">Password</label>
          <input type="password" name="loginPassword" {...register("password")} />
          <input type={"submit"} value={"Sign in"} />
        </form>
      </div>
    </>
  );
}

export default LoginForm;