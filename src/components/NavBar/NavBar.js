import React from "react";
import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

const NavBar = ({ links }) => {
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
          <Grid xs={6}>
            <Tabs
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              {links.map((link, index) => (
                <Tab key={index} label={link} />
              ))}
            </Tabs>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Box display="flex">
              <Button sx={{ marginLeft: "auto" }} variant="contained">
                Login
              </Button>
              <Button sx={{ marginLeft: 1 }} variant="contained">
                Signup
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
