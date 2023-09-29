import React from "react";
import "./LoginModal.css";

const LoginModal = ({ open, onClose, handleOnLogin, handleOnSignUp }) => {
  if (!open) {
    return null;
  }
  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <p className="tryAgain">Wanna Shop?</p>
            <div className="btnContainer">
              <button className="btnYes" onClick={handleOnLogin}>
                <span className="bold">Log</span>in
              </button>
              <button className="btnNo" onClick={handleOnSignUp}>
                <span className="bold">Sign</span>up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
