import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Shop from "../Shop/Shop";
import NavBar from "../NavBar/NavBar";

const Home = () => {
  const myRef = useRef(null);

  return (
    <div ref={myRef}>
      <NavBar />
      <div className="home-wrap">
        <h1 className="main-title">Dummy JSON Shop</h1>
        <Shop myRef={myRef} />
      </div>
    </div>
  );
};

export default Home;
