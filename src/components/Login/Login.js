import React, { useState, useContext } from "react";
import { AppContext } from "../../Contexts/AppContext.js";
import { useNavigate } from "react-router-dom";
import { login } from "../Auth/AuthService.js";
import { Link } from "react-router-dom";
import { isFakeUser, fakeUsers } from "../../Services/UserService.js";

const Login = () => {
  const { userInfo } = useContext(AppContext);
  const [selectedName, setSelectedName] = useState(""); // New state for selected name
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold the error message
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // const data = await response.json();
        // const { jwt } = data;
        // localStorage.setItem("jwtToken", jwt);

        navigate("/dashboard");
      } else {
        setError("Authentication failed. Please check your credentials."); // Set the error message
      }
    } catch (error) {
      setError("An error occurred. Please try again later."); // Set the error message
    }
  };

  const handleNameChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedName(selectedValue);

    if (selectedValue === "clearInputs") {
      setUsername("");
      setPassword("");
    } else {
      const selectedUser = fakeUsers.find(
        (user) => user.username === selectedValue
      );
      if (selectedUser) {
        setUsername(selectedUser.username);
        setPassword(selectedUser.password);
      }
    }
  };

  return (
    <div>
      <h1 className="signup-header">Login - {userInfo?.username}</h1>
      <select value={selectedName} onChange={handleNameChange}>
        <option value="clearInputs">Select a Name</option>{" "}
        {/* Add a clear option */}
        {fakeUsers.map((user) => (
          <option key={user.id} value={user.username}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
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
