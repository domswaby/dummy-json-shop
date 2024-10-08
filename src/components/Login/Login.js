import React, { useState, useContext, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { AppContext } from "../../Contexts/AppContext.js";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar.js";
import { cartFactory } from "../Product/CartFactory.js";
import { getFakeUsers, getUserInfo } from "../../Services/UserService.js";
import "./Login.css";

const Login = () => {
  const { newUsers, setUserInfo, setIsRealUser, setCart, cart } =
    useContext(AppContext);
  const [fakeUsers, setFakeUsers] = useState([]);
  const [loadingFakes, setLoadingFakes] = useState(true);
  const [selectedName, setSelectedName] = useState(""); // New state for selected name
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold the error message
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    // if the user is using their own credentials
    let isValid = true;
    if (selectedName === "clearInputs" || selectedName === "") {
      if (username.trim() === "") {
        setUsernameError("Username is required");
        isValid = false;
      }

      if (password.trim() === "") {
        setPasswordError("Password is required");
        isValid = false;
      }

      if (!isValid) {
        // Display error messages for 3 seconds
        setTimeout(() => {
          setUsernameError("");
          setPasswordError("");
        }, 3000); // 3 seconds in milliseconds
        return;
      }
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "sophiab",
            password: "sophiabpass",
          }),
        });

        if (response.ok) {
          const newUserInfo = getUserInfo(username, newUsers);
          if (newUserInfo === null) {
            handleErrorMessage(
              "Authentication failed. Please check your credentials."
            );
          } else {
            setIsRealUser(true);
            setUserInfo(newUserInfo);
            navigate("/");
          }
        } else {
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
          const responseData = await response.json();
          setIsRealUser(false);
          setUserInfo(responseData);
          if (!(responseData.id in cart)) {
            try {
              const cartResponse = await fetch(
                `https://dummyjson.com/carts/user/${responseData.id}`
              );
              if (cartResponse.ok) {
                let newCart;
                const cartData = await cartResponse.json();
                if (cartData.carts.length === 0) {
                  newCart = cartFactory();
                  newCart.id = responseData.id;
                  newCart.userId = responseData.id;
                } else {
                  newCart = cartData.carts[0];
                  newCart.id = responseData.id;
                }

                setCart({ ...cart, [responseData.id]: newCart });
              } else {
                console.error("Failed to fetch user's cart data.");
              }
            } catch (cartError) {
              console.error(
                "An error occurred while fetching user's cart data:",
                cartError
              );
            }
          }

          navigate("/");
        } else {
          handleErrorMessage(
            "Authentication failed. Please check your credentials."
          );
        }
      } catch (error) {
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
  };

  const initializeFakeUsers = async () => {
    try {
      let newFakeUsers = await getFakeUsers();

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
            <div className="auth-error">{usernameError}</div>
            <div className="auth-error">{passwordError}</div>
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
