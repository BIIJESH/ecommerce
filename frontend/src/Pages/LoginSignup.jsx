import React, { useState } from "react";
import "./Css/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [suggestions, setSuggestions] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const capitalizeFirstName = (value) => {
    const nameParts = value.split(" ");
    nameParts[0] = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
    if (nameParts.length > 1) {
      nameParts[1] =
        nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1);
    }
    return nameParts.join(" ");
  };

  const validateUsername = (value) => {
    const nameParts = value.trim().split(" ");
    if (nameParts.length < 2 || nameParts.some((part) => part.trim() === "")) {
      return "Please enter both a valid first and last name.";
    }
    return "";
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === "") {
      return "Email address is required.";
    }
    if (!emailRegex.test(value)) {
      return "Please provide a valid email address.";
    }
    return "";
  };

  const validatePassword = (value) => {
    const passwordRules = [
      {
        regex: /.{8,}/,
        message: "Password must be at least 8 characters long.",
      },
      {
        regex: /[A-Z]/,
        message: "Password must contain at least one uppercase letter.",
      },
      {
        regex: /[a-z]/,
        message: "Password must contain at least one lowercase letter.",
      },
      { regex: /\d/, message: "Password must contain at least one number." },
      {
        regex: /[!@#$%^&*]/,
        message: "Password must contain at least one special character.",
      },
    ];

    for (const rule of passwordRules) {
      if (!rule.regex.test(value)) {
        return rule.message;
      }
    }
    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword.trim() === "") {
      return "Please confirm your password.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    const updatedValue =
      name === "username" ? capitalizeFirstName(value) : value;
    setFormData({ ...formData, [name]: updatedValue });

    let suggestion = "";
    if (name === "username") {
      suggestion = validateUsername(updatedValue);
    } else if (name === "email") {
      suggestion = validateEmail(value);
    } else if (name === "password") {
      suggestion = validatePassword(value);
    } else if (name === "confirmPassword") {
      suggestion = validateConfirmPassword(formData.password, value);
    }
    setSuggestions((prev) => ({ ...prev, [name]: suggestion }));
  };

  const login = async () => {
    if (Object.values(suggestions).some((msg) => msg)) {
      alert("Please fix the errors before logging in.");
      return;
    }

    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
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
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(
        responseData?.errors || "Invalid credentials. Please try again."
      );
    }
  };

  const signup = async () => {
    if (Object.values(suggestions).some((msg) => msg)) {
      alert("Please fix the errors before signing up.");
      return;
    }
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
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
      alert(
        responseData?.errors || "An unknown error occurred. Please try again."
      );
    }
  };

  const handleStateChange = (newState) => {
    if (newState === "Sign Up" && suggestions.email) {
      setFormData((prev) => ({ ...prev, email: "" }));
    }
    setState(newState);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <div>
              <input
                type="text"
                placeholder="Your first and last name"
                name="username"
                value={formData.username}
                onChange={changeHandler}
              />
              {suggestions.username && (
                <p className="error">{suggestions.username}</p>
              )}
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
            {suggestions.email && <p className="error">{suggestions.email}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
            {suggestions.password && (
              <p className="error">{suggestions.password}</p>
            )}
          </div>
          {state === "Sign Up" && (
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
              />
              {suggestions.confirmPassword && (
                <p className="error">{suggestions.confirmPassword}</p>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          disabled={
            state === "Sign Up" &&
            Object.values(suggestions).some((msg) => msg)
          }
        >
          Continue
        </button>

        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                handleStateChange("Sign Up");
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
                handleStateChange("Login");
              }}
            >
              Login here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
