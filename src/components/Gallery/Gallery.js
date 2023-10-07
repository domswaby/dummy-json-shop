import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./Gallery.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Gallery = ({ products, loading, setOpenModal }) => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AppContext);

  const handleCardClick = (product) => {
    if (userInfo) {
      navigate(`/product/${product.id}`);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <div>
      {loading ? (
        <Box className="fake-users-progress">
          <CircularProgress color="secondary" size={100} />
        </Box>
      ) : products.length > 0 ? (
        <div className="filterable-cards">
          {products.map((product, index) => (
            <div
              key={index}
              className="card"
              onClick={(e) => handleCardClick(product)}
            >
              <img src={product.images[0]} alt={`Image ${index}`} />
              <div className="card-body">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results-wrap">
          <p>No results.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
