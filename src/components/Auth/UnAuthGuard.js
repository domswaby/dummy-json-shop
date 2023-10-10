import React from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { checkAuthentication } from "./AuthService";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

const UnAuthGuard = ({ children }) => {
  const {userInfo} = useContext(AppContext);
  const location = useLocation();
  if (!userInfo) {
    return children;
  } else {
    return <Navigate to={"/home"} state={{ from: location }} replace />;
  }
};

export default UnAuthGuard;
