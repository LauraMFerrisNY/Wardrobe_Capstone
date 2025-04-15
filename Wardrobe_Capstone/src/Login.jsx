import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "./assets/Wardrobe_App_Logo.png";
import "./stylesheets/authform.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // API call here
    if (username === "user" && password === "password") {
      // Store authentication token or user info (e.g., in local storage)
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="authContainer">
      <form className="authHeader" onSubmit={handleSubmit}>
        <img src={LOGO} alt="Home" height="200rem" />
        <h1>Welcome Back!</h1>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submitBtn">Login</button>
      </form>
    </div>
  );
}

export default Login;
