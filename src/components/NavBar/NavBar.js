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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import DrawerComp from "../Drawer/DrawerComp";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState();
  const links = ["Cart", "Shop"];

  return (
    <AppBar
      sx={{
        position: "sticky",
        backgroundImage:
          "linear-gradient(90deg, rgba(180,58,58,1) 2%, rgba(49,49,116,1) 36%, rgba(105,0,161,1) 73%, rgba(166,69,252,1) 100%)",
      }}
    >
      <Toolbar>
        {isMatch ? (
          <>
            <Typography>
              <StoreIcon />
            </Typography>
            <DrawerComp links={links} isMatch={isMatch} />
          </>
        ) : (
          <Grid sx={{ placeItems: "center" }} container>
            <Grid item xs={2}>
              <Typography>
                <Link to="/">
                  <StoreIcon
                    sx={{ fontSize: "2.5rem" }}
                    className="my-store-icon"
                  />
                </Link>
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
                <Button
                  className="my-nav-btn"
                  to="/login"
                  sx={{ marginLeft: "auto", background: "none" }}
                  variant="contained"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  className="my-nav-btn"
                  sx={{ marginLeft: 1, background: "none" }}
                  variant="contained"
                >
                  <Link to="/signup">Signup</Link>
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
