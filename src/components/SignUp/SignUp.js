import { AppContext } from "../../Contexts/AppContext.js";
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const { setUserInfo, newUserCount, setNewUserCount } = useContext(AppContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
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
          id: 100 + newUserCount,
        };
        setUserInfo(newUser);
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
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
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
  );
};

export default SignUp;
