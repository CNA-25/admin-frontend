import React from "react";
import { useForm } from "react-hook-form";


// Based on GeeksForGeeks tutorial: Basic Registration and Login Form Using React Hook Form
// https://www.geeksforgeeks.org/react-hook-form-create-basic-reactjs-registration-and-login-form/

// Login form
function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Define URL for user service API
  API_URL = process.env('USER_SVC') || 'https://user-service-api-user-service.2.rahtiapp.fi';

  const onSubmit = (data) => {
    // Send request to user service API
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        });
      });
      const respData = await resp.json();

      if (resp.ok) {
        // Save JWT to localStorage
        localStorage.setItem('user_token', respData.access_token);

      }
    } catch (error) {
      console.error(error.message)
    }

      /*
      const userData = JSON.parse(localStorage.getItem(data.email));
      if (userData) {
        if (userData.password === data.password) {
          console.log(userData.name + ", you are successfully logged in.");
        } else {
          console.log("Email or password is incorrect.");
        }
      } else {
        console.log("Email or password is incorrect.")
      }
    };
    */

    // Form UI
    return (
      <>
        <p className="title">Sign in</p>
        <form className="Login" onSubmit={handleSubmit(onSubmit)}>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span style={{ color: "red" }}>Email is required.</span>}
          <input type="password" {...register("password")} />
          <input type={"submit"} />
        </form>
      </>
    );
  }

  export default LoginForm;