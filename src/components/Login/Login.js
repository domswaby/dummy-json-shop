import React, { useState, useContext, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { AppContext } from "../../Contexts/AppContext.js";
import { useNavigate } from "react-router-dom";
import { login } from "../Auth/AuthService.js";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar.js";
import {
  isFakeUser,
  getFakeUsers,
  getUserInfo,
} from "../../Services/UserService.js";
import "./Login.css";

const Login = () => {
  const { userInfo, newUsers, setUserInfo, setIsRealUser } =
    useContext(AppContext);
  const [fakeUsers, setFakeUsers] = useState([]);
  const [loadingFakes, setLoadingFakes] = useState(true);
  const [selectedName, setSelectedName] = useState(""); // New state for selected name
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold the error message
  const navigate = useNavigate();

  const handleLogin = async () => {
    // if the user is using their own credentials
    if (selectedName === "clearInputs" || selectedName === "") {
      console.log("own credentials option");
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "kminchelle",
            password: "0lelplR",
            // expiresInMins: 60, // optional
          }),
        });

        if (response.ok) {
          const newUserInfo = getUserInfo(username, newUsers);
          if (newUserInfo === null) {
            console.log("user info is null");
            handleErrorMessage(
              "Authentication failed. Please check your credentials."
            );
          } else {
            setIsRealUser(true);
            setUserInfo(newUserInfo);
            navigate("/dashboard");
          }
        } else {
          console.log("bad request");
          handleErrorMessage(
            "Authentication failed. Please check your credentials."
          );
        }
      } catch (error) {
        handleErrorMessage("An error occurred. Please try again later.");
      }
    }
    // if the user is using dummy user credentials
    else {
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const responseData = await response.json(); // Parse response body as JSON
          console.log("it worked!");
          console.log(responseData); // Access the parsed JSON data
          setIsRealUser(false);
          console.log("set the real user");
          setUserInfo(responseData); // Assuming responseData contains user info
          console.log("Set the data");
          navigate("/");
        } else {
          handleErrorMessage(
            "Authentication failed. Please check your credentials."
          ); // Set the error message
        }
      } catch (error) {
        console.log("came into the error block");
        handleErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const handleErrorMessage = (newErrorMessage) => {
    setError(newErrorMessage);
    setTimeout(() => {
      setError("");
    }, 1000);
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
    console.log(selectedValue);
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
    console.log(newUsers);
    initializeFakeUsers();
  }, []);

  return (
    <>
      <NavBar />
      <div className="auth-container">
        <h1 className="signup-header">Login</h1>
        <div className="auth-form">
          <p className="dummy-shopper-span-wrap">
            Select a <span className="dummy-shopper-span">dummy shopper:</span>
          </p>
          <div className="select-wrap">
            <select
              className="user-select"
              value={selectedName}
              onChange={handleNameChange}
              disabled={loadingFakes}
            >
              <option value="clearInputs">Select Someone</option>{" "}
              {/* Add a clear option */}
              {fakeUsers.map((user) => (
                <option key={user.id} value={user.username}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          <p className="dummy-shopper-span-wrap">
            Or use <span className="dummy-shopper-span">your credentials:</span>
          </p>
          <div className="auth-input-wrap">
            <div>
              <input
                className="auth-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="auth-btn">
            <button onClick={handleLogin}>Login</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          {/* Display the error message if it exists */}
        </div>
        {loadingFakes && (
          <div className="progress-container">
            <div className="fake-users-progress-wrap">
              <p className="loading-background-text">
                Loading Dummy Shoppers...
              </p>
              <Box className="fake-users-progress">
                <CircularProgress color="secondary" size={100} />
              </Box>
            </div>
          </div>
        )}
        <div className="auth-footer">
          <p>
            Don't have an account yet? <Link to="/signup">Sign up</Link>
          </p>
          <p>
            <Link to="/">Go home</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
