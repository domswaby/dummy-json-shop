import { AppContext } from "../../Contexts/AppContext.js";
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar.js";
import { cartFactory } from "../Product/CartFactory.js";
import "../Login/Login.css";
import "./SignUp.css";

const SignUp = () => {
  const {
    newUserCount,
    setNewUserCount,
    newUsers,
    setNewUsers,
    cart,
    setCart,
  } = useContext(AppContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignUp = async () => {
    setFirstNameError("");
    setLastNameError("");
    setUsernameError("");
    setPasswordError("");
    // Validation logic
    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("First Name is required");
      isValid = false;
    }

    if (lastName.trim() === "") {
      setLastNameError("Last Name is required");
      isValid = false;
    }

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
        setFirstNameError("");
        setLastNameError("");
        setUsernameError("");
        setPasswordError("");
      }, 3000); // 3 seconds in milliseconds
      return;
    }
    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
        }),
      });

      if (response.ok) {
        setNewUserCount((cur) => cur + 1);

        let newUser = {
          firstName,
          lastName,
          username,
          password,
          email: "dummyaddress@email.com",
          image:
            "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
          id: 101 + newUserCount,
        };
        setNewUsers([...newUsers, newUser]);
        let newCart = cartFactory();
        newCart.id = newUser.id;
        newCart.userId = newUser.id;
        setCart({ ...cart, [newUser.id]: newCart });
        setSuccessMessage("Sign up successful. You can now log in.");
        setErrorMessage("");
        console.log("This is the new cart" + JSON.stringify(newCart));
        console.log("These are the newUsers: " + JSON.stringify(newUsers));
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
    <>
      <NavBar />
      <div className="auth-container">
        <h1 className="signup-header">Sign Up</h1>
        <div className="auth-form">
          <p className="dummy-shopper-span-wrap">
            You're almost <span className="dummy-shopper-span">shopping!</span>
          </p>
          <div className="auth-input-wrap">
            <input
              className="auth-input"
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div className="auth-error">{firstNameError}</div>
            <input
              className="auth-input"
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="auth-error">{lastNameError}</div>
            <input
              className="auth-input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="auth-error">{usernameError}</div>
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="auth-error">{passwordError}</div>
          </div>
          <div className="auth-btn">
            <button onClick={handleSignUp}>Sign Up</button>
          </div>
          {successMessage && (
            <>
              <p style={{ color: "green" }}>{successMessage}</p>
              <p>
                <Link to="/login">Log in</Link>
              </p>
            </>
          )}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <p>
            <Link to="/">Go back home</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
