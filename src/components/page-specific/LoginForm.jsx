import React from "react";
import { useForm } from "react-hook-form";

// Based on GeeksForGeeks tutorial: Basic Registration and Login Form Using React Hook Form
// https://www.geeksforgeeks.org/react-hook-form-create-basic-reactjs-registration-and-login-form/

// Login form
function LoginForm() {
    const {register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
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