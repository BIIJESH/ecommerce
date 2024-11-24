import React, { useState } from "react";
import "./Css/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json", // Fixed the "Accept" header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data))
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again later.");
      });

    if (responseData && responseData.success) {
      // If login is successful, save token and redirect
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      // If login fails, show the error message
      alert(responseData?.errors || "An unknown error occurred. Please try again.");
    }
  };

  const signup = async () => {
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json", // Fixed the "Accept" header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data))
      .catch((error) => {
        console.error("Error during signup:", error);
        alert("An error occurred during signup. Please try again later.");
      });

    if (responseData && responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      // If signup fails, show the error message
      alert(responseData?.errors || "An unknown error occurred. Please try again.");
    }

    console.log("SignUp function executed", formData);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            onChange={changeHandler}
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>

        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
