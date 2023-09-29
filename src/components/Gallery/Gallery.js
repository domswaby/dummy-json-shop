import React, { useEffect, useState } from "react";
import "./Gallery.css";

const Gallery = ({ products, loading }) => {
  // const picsArray = [
  //   "https://source.unsplash.com/Kl1gC0ve620",
  //   "https://source.unsplash.com/55btQzyDiO8",
  //   "https://source.unsplash.com/g0dBbrGmMe0",
  //   "https://source.unsplash.com/v1OW17UcR-Q",
  //   "https://source.unsplash.com/Wpg3Qm0zaGk",
  //   "https://source.unsplash.com/W3FC_bCPw8E",
  //   "https://source.unsplash.com/rBRZLPVLQg0",
  //   "https://source.unsplash.com/RRksEVVoU8o",
  // ];

  // const [pics, setPics] = useState([]);

  // useEffect(() => {
  //   setPics(picsArray);
  // }, []);

  return (
    <div className="filterable-cards">
      {products.map((product, index) => (
        <div key={index} className="card">
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
