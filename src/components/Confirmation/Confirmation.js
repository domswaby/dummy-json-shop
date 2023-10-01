import React, { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./Confirmation.css";
import NavBar from "../NavBar/NavBar";

const Confirmation = () => {
  const { userInfo, mostRecentTransaction } = useContext(AppContext);
  return (
    <div>
      <NavBar />
      <div className="confirmation-wrap">
        <h2>Confirmation</h2>
        <p>{JSON.stringify(mostRecentTransaction)}</p>
      </div>
    </div>
  );
};

export default Confirmation;
