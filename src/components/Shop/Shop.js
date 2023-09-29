import React from "react";
import "./Shop.css";
import Search from "../Search/Search";
import Gallery from "../Gallery/Gallery";
import Pagination from "@mui/material/Pagination";
import { Box, Stack } from "@mui/material";

const Shop = () => {
  return (
    <div className="shop-container">
      {/* <Search /> */}
      <Gallery />
      <Stack alignItems="center" className="pagination-stack">
        <Pagination count={10} color="secondary" size="large" />
      </Stack>
    </div>
  );
};

export default Shop;
