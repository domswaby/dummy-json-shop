import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1 className="main-title">Welcome to Dummy JSON Shop</h1>
      <p>
        <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Home;
