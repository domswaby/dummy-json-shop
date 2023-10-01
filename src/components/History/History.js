import React from "react";
import "./History.css";
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

const History = () => {
  const { userInfo } = useContext(AppContext);
  return (
    <div>
      <NavBar />
      <div className="history-wrap">
        <h2>Transaction History</h2>
      </div>
    </div>
  );
};

export default History;
