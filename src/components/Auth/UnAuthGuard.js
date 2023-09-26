import React from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { checkAuthentication } from "./AuthService";

const UnAuthGuard = ({ children }) => {
  const location = useLocation();
  if (!checkAuthentication()) {
    return children;
  } else {
    return <Navigate to={"/dashboard"} state={{ from: location }} replace />;
  }
};

export default UnAuthGuard;
