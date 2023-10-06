// AuthGuard.js
import React from "react";
import { checkAuthentication } from "./AuthService"; // Your authentication service
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { userInfo } = useContext(AppContext);

  const location = useLocation();
  if (userInfo) {
    return children;
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

export default AuthGuard;
