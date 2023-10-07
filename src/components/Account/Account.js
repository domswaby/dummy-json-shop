import React, { useContext } from "react";
import "./Account.css";
import NavBar from "../NavBar/NavBar";

import { AppContext } from "../../Contexts/AppContext";

const Account = () => {
  const { userInfo } = useContext(AppContext);

  console.log(JSON.stringify(userInfo));

  return (
    <div>
      <NavBar />
      <div className="account-wrap">
        <h2>Account Details</h2>
        <div className="details-wrap">
          <div className="details-image-wrap">
            <img src={userInfo.image} />
          </div>
          <p>
            <strong>ID:</strong> <span>{userInfo.id}</span>
          </p>
          <p>
            <strong>Username:</strong> <span>{userInfo.username}</span>
          </p>
          <p>
            <strong>Email:</strong> <span>{userInfo.email}</span>
          </p>
          <p>
            <strong>First Name:</strong> <span>{userInfo.firstName}</span>
          </p>
          <p>
            <strong>Last Name:</strong> <span>{userInfo.lastName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
