import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./Search.css";
import { debounce } from "lodash";

// these styles are used to override the default MUI text field input styles
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#282c34",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#282c34",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#282c34",
    },
    "&:hover fieldset": {
      borderColor: "#282c34",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#282c34",
    },
  },
  color: "#282c34",
});

const Search = ({
  search,
  setSearch,
  setSearchedPage,
  categories,
  category,
  setCategory,
}) => {
  // this search input is debounced to avoid an unnecessary number of network requests being sent
  const debouncedSearch = debounce((val) => {
    setSearch(val);
  }, 500);

  const [displayCategory, setDisplayCategory] = useState({
    name: "Category",
    slug: "",
    url: "",
  });

  // Handle category selection changes
  const handleCategoryChange = (e) => {
    let val = JSON.parse(e.target.value);
    setDisplayCategory(e.target.value);
    setCategory(val.slug);
  };

  const searchInputStyles = {
    width: "100%",
    margin: "1rem auto 5px auto",
  };

  return (
    <div>
      <div className="category-select-wrap">
        <select onChange={handleCategoryChange} value={displayCategory}>
          <option
            value={JSON.stringify({ name: "Category", slug: "", url: "" })}
          >
            Category
          </option>
          {categories.map((categoryOption, index) => (
            <option key={index} value={JSON.stringify(categoryOption)}>
              {categoryOption.name}
            </option>
          ))}
        </select>
      </div>
      <div className="search-input-wrap">
        <CssTextField
          sx={searchInputStyles}
          className="search-input"
          label={"🔍 Search " + (category ? category : "products")}
          type="search"
          id="custom-css-outlined-input"
          defaultValue={search}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
