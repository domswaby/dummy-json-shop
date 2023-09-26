import React, { useState, useContext, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { AppContext } from "../../Contexts/AppContext.js";
import { useNavigate } from "react-router-dom";
import { login } from "../Auth/AuthService.js";
import { Link } from "react-router-dom";
import { isFakeUser, getFakeUsers } from "../../Services/UserService.js";
import "./Login.css";

const Login = () => {
  const { userInfo } = useContext(AppContext);
  const [fakeUsers, setFakeUsers] = useState([]);
  const [loadingFakes, setLoadingFakes] = useState(true);
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

  const initializeFakeUsers = async () => {
    try {
      let newFakeUsers = await getFakeUsers();
      console.log(newFakeUsers.users[0]);

      // Simulate a delay of 2 seconds (2000 milliseconds)
      setTimeout(() => {
        setFakeUsers(newFakeUsers.users);
        setLoadingFakes(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      // Handle any error that may occur during the data fetching or state update.
    }
  };

  useEffect(() => {
    initializeFakeUsers();
  }, []);

  return (
    <div>
      <h1 className="signup-header">Login - {userInfo?.username}</h1>
      <select
        value={selectedName}
        onChange={handleNameChange}
        disabled={loadingFakes}
      >
        <option value="clearInputs">Select a name</option>{" "}
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
      {loadingFakes && (
        <div className="fake-users-progress-wrap">
          <p class="loading-background-text">Loading fake users...</p>
          <Box className="fake-users-progress">
            <CircularProgress color="secondary" size={100} />
          </Box>
        </div>
      )}
    </div>
  );
};

export default Login;
