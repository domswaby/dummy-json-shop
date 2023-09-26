import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Auth/AuthService.js";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold the error message
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { jwt } = data;
        localStorage.setItem("jwtToken", jwt);
        navigate("/dashboard");
      } else {
        setError("Authentication failed. Please check your credentials."); // Set the error message
      }
    } catch (error) {
      setError("An error occurred. Please try again later."); // Set the error message
    }
  };

  return (
    <div>
      <h1 className="signup-header">Login</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="signup-btn">
        <button onClick={handleLogin}>Login</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display the error message if it exists */}
      <p>
        Don't have an account yet? <Link to="/signup">Sign up</Link>
      </p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  );
};

export default Login;
