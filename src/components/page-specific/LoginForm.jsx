import React from "react";
import { useForm } from "react-hook-form";

// Based on GeeksForGeeks tutorial: Basic Registration and Login Form Using React Hook Form
// https://www.geeksforgeeks.org/react-hook-form-create-basic-reactjs-registration-and-login-form/

// Login form
function LoginForm() {
    const {register, handleSubmit, formState: { errors } } = useForm();


    const testUser = {
      "email": "john.pork@example.com",
      "password": "abcdef12345",
      "firstName": "John",
      "lastName": "Pork"
    }
    localStorage.setItem(testUser.email , JSON.stringify(testUser));
    console.log(`localStorage.testUser: ${localStorage.getItem(testUser.email)}`);

    const onSubmit = (data) => {
      const userData = JSON.parse(localStorage.getItem(data.email));
      
      if (userData) {
        console.log(`Parsed userData: ${JSON.stringify(userData)}`)

        if (userData.password === data.password) {
          console.log(userData.firstName + ", you are successfully logged in.");
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