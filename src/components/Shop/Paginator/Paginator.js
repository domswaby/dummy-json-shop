import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Paginator.css";
import { useMediaQuery, useTheme } from "@mui/material";

const Paginator = ({
  search,
  curatedPage,
  searchedPage,
  setCuratedPage,
  setSearchedPage,
  myRef,
  totalCuratedResults,
  totalSearchedResults,
}) => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  // if the user is searching while selecting a different page the searchedPage will be updated
  // otherwise the curatedPage will be updated
  const changePage = (e, pageNumber) => {
    if (search) {
      setSearchedPage(pageNumber);
    } else {
      setCuratedPage(pageNumber);
    }
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  // much of the logic here depends on if the user is searching or not, i.e. if the search input is empty or not
  // the total number of pages (the count attribute) calculates the number of pages based on the number of total search results
  return (
    <Stack spacing={2} className="paginator-stack" alignItems="center">
      <Pagination
        count={
          search
            ? Math.ceil(totalSearchedResults / 10)
            : Math.ceil(totalCuratedResults / 10)
        }
        page={search ? searchedPage : curatedPage}
        color="secondary"
        onChange={changePage}
        size={small ? "small" : "large"}
        variant="outlined"
        shape="rounded"
        hidePrevButton={search ? (searchedPage === 1 ? true : false) : (curatedPage === 1 ? true : false)}
        hideNextButton={search ? (searchedPage === Math.ceil(totalSearchedResults / 10) ? true : false) : (curatedPage === Math.ceil(totalCuratedResults / 10) ? true : false)}
      />
    </Stack>
  );
};

export default Paginator;
