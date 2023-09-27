import React from "react";
import { useState } from "react";
import { AppBar, Grid, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

const NavBar = () => {
  const [value, setValue] = useState();

  return (
    <AppBar>
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
            <Typography>
              <StoreIcon />
            </Typography>
          </Grid>
          <Grid xs={5}>
            <Tabs
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab label="Cart" />
              <Tab label="Shop" />
            </Tabs>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
