import React, { useRef, useState, useEffect } from "react";
import "./Shop.css";
import Gallery from "../Gallery/Gallery";
import { Box } from "@mui/material";
import Search from "./Search/Search";
import Paginator from "./Paginator/Paginator";
import LoginModal from "./LoginModal/LoginModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Shop = ({ myRef }) => {
  const navigate = useNavigate();
  const isInitialMount1 = useRef(true);
  const isInitialMount2 = useRef(true);

  const [openModal, setOpenModal] = useState(false);

  const [curatedPage, setCuratedPage] = useState(1);
  const [searchedPage, setSearchedPage] = useState(1);
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [totalCuratedResults, setTotalCuratedResults] = useState(0);
  const [totalSearchedResults, setTotalSearchedResults] = useState(0);

  const getCurated = async () => {
    setLoading(true);
    let resData = {};

    if (allProducts.length === 0 || category === "") {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=0`
      );
      resData = data;
    } else if (category) {
      const { data } = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      resData = data;
    }
    setSearch("");
    setTotalCuratedResults(resData.products.length);
    setAllProducts(resData.products);
    setProducts(resData.products.slice(0, 10));
    setCuratedPage(1);
  };

  const getSearched = async () => {
    setLoading(true);
    let searchTerm = search.toLowerCase(); // Reassign search to a new variable
    const matchingProducts = [];

    for (const product of allProducts) {
      const productTitle = product.title.toLowerCase();
      const productDescription = product.description.toLowerCase();
      const productBrand = product.brand.toLowerCase();
      const productCategory = product.category.toLowerCase();

      if (
        productTitle.includes(searchTerm) ||
        productDescription.includes(searchTerm) ||
        productBrand.includes(searchTerm) ||
        productCategory.includes(searchTerm)
      ) {
        matchingProducts.push(product);
      }
    }

    setTotalSearchedResults(matchingProducts.length);
    setFilteredProducts(matchingProducts);
    setSearchedPage(1);
    setProductsForPage();
  };

  const setProductsForPage = () => {
    const page = search ? searchedPage : curatedPage;

    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let pageItems = [];

    if (search) {
      pageItems = filteredProducts.slice(startIndex, endIndex);
    } else {
      pageItems = allProducts.slice(startIndex, endIndex);
    }

    setProducts(pageItems);
  };

  const getCategories = async () => {
    const { data } = await axios.get(
      "https://dummyjson.com/products/categories"
    );
    setCategories(data);
  };

  // this useEffect is central to the overall app logic
  // it runs when:
  // 1. the page loads
  // 2. when the user uses the pagination menu to navigate to a new page
  // 3. when the user types in the search input

  useEffect(() => {
    if (search) {
      getSearched();
    } else {
      getCurated();
    }
  }, [search]);

  // when user changes page, set new products for that page
  useEffect(() => {
    if (isInitialMount1.current) {
      // Skip running the effect on the initial mount
      isInitialMount1.current = false;
    } else {
      // This code will run on subsequent updates
      setProductsForPage();
    }
  }, [curatedPage, searchedPage]);

  // retrieve products again and get rid of search when
  // user changes the category
  useEffect(() => {
    if (isInitialMount2.current) {
      // Skip running the effect on the initial mount
      isInitialMount2.current = false;
    } else {
      getCurated();
    }
  }, [category]);

  useEffect(() => {
    setProductsForPage();
    setLoading(false);
  }, [filteredProducts]);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  const handleOnLogin = () => {
    setOpenModal(false);
    navigate("/login");
  };

  const handleOnSignUp = () => {
    setOpenModal(false);
    navigate("/signup");
  };

  const handleOnClose = () => {
    setOpenModal(false);
  };

  // get categories on initial render
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="shop-container">
      <LoginModal
        open={openModal}
        onClose={handleOnClose}
        handleOnClose={handleOnClose}
        handleOnSignUp={handleOnSignUp}
        handleOnLogin={handleOnLogin}
      />
      <Search
        categories={categories}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        setSearchedPage={setSearchedPage}
      />
      <Box className="current-results-description">
        <span>
          {search
            ? `Search results page ${searchedPage}:`
            : `Curated feed page ${curatedPage}:`}
        </span>
      </Box>
      <Gallery
        products={products}
        loading={loading}
        setOpenModal={setOpenModal}
      />
      <Paginator
        search={search}
        curatedPage={curatedPage}
        searchedPage={searchedPage}
        setCuratedPage={setCuratedPage}
        setSearchedPage={setSearchedPage}
        totalCuratedResults={totalCuratedResults}
        totalSearchedResults={totalSearchedResults}
        myRef={myRef}
      />
    </div>
  );
};

export default Shop;
