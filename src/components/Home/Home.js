import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Shop from "../Shop/Shop";
import NavBar from "../NavBar/NavBar";

const Home = () => {
  return (
    <>
    <NavBar />
    <div className="home-wrap">
      <h1 className="main-title">Dummy JSON Shop</h1>
      <Shop />
    </div>
    </>
  );
};

export default Home;
