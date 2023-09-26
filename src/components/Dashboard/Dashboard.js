import "./Dashboard.css";
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

const Dashboard = () => {
  const { userInfo } = useContext(AppContext);
  return <div>{userInfo.username}</div>;
};

export default Dashboard;
