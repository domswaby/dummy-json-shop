import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          role: "ROLE_USER", // Hardcoded as ROLE_USER
        }),
      });

      if (response.ok) {
        setSuccessMessage("Sign up successful. You can now log in.");
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage("Sign up failed. Please check your information.");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1 className="signup-header">Sign Up</h1>
      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
      />
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
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  );
};

export default SignUp;
