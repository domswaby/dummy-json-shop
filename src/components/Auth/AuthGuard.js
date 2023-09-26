// AuthGuard.js
import React from "react";
import { checkAuthentication } from "./AuthService"; // Your authentication service
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const location = useLocation();
  if (checkAuthentication()) {
    return children;
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

export default AuthGuard;
