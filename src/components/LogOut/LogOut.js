import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogOut.css";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    // Remove jwtToken from localStorage
    localStorage.removeItem("jwtToken");

    // Navigate back to "/"
    navigate("/");
  };

  return (
    <button className="logout-btn" onClick={handleLogOut}>
      Log Out
    </button>
  );
};

export default LogOut;
