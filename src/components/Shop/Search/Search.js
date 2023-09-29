import React from "react";
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
  width: "100%",
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

  // Handle category selection changes
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="category-select-wrap">
        <select onChange={handleCategoryChange} value={category}>
          <option value="">Category</option>
          {categories.map((categoryOption, index) => (
            <option key={index} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
      </div>
      <CssTextField
        className="search-input"
        label={"🔍 Search " + (category ? category : "products")}
        type="search"
        id="custom-css-outlined-input"
        defaultValue={search}
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </>
  );
};

export default Search;
