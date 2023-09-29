import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./Gallery.css";
import { useNavigate } from "react-router-dom";

const Gallery = ({ products, loading, setOpenModal }) => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AppContext);

  const handleCardClick = () => {
    if (userInfo) {
      navigate("/");
    } else {
      setOpenModal(true);
    }
  };

  return (
    <div className="filterable-cards">
      {products.map((product, index) => (
        <div
          key={index}
          className="card"
          onClick={() => handleCardClick(product)}
        >
          <img src={product.images[0]} alt={`Image ${index}`} />
          <div className="card-body">
            <h6 className="card-title">{product.title}</h6>
            <p className="card-text">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
