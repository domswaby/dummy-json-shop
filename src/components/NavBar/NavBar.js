import React from "react";
import { useState, useContext } from "react";
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
  IconButton,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DrawerComp from "../Drawer/DrawerComp";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AppContext);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState();
  const links = ["Cart", "Shop"];

  const logOutStyles = {
    marginLeft: "auto",
    marginRight: "1rem",
    background: "none",
    color: "rgba(255, 255, 255, 0.7)",
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 1)",
    },
  };
  const loginButtonStyles = {
    color: "rgba(255, 255, 255, 0.7)",
    marginLeft: "auto",
    background: "none",
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 1)",
    },
  };
  const signUpButtonStyles = {
    color: "rgba(255, 255, 255, 0.7)",
    marginLeft: 1,
    background: "none",
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 1)",
    },
  };

  const accountIconStyles = {
    transition: "border-radius 1s ease-in-out, background-color 0.3s ease-in",
    borderRadius: "5%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: "100% !important",
    "&:hover": {
      cursor: "pointer",
      borderRadius: "100%",
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
  };

  const onLogOut = () => {
    setUserInfo(null);
    navigate("/login");
  };

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
              <p></p>
              {/* <Tabs
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                {links.map((link, index) => (
                  <Tab key={index} label={link} /> 
                ))}
              </Tabs> */}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <Box display={userInfo ? "none" : "flex"}>
                <Button
                  className="my-nav-btn"
                  sx={loginButtonStyles}
                  to="/login"
                  variant="contained"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  className="my-nav-btn"
                  sx={signUpButtonStyles}
                  variant="contained"
                >
                  <Link to="/signup">Signup</Link>
                </Button>
              </Box>
              <Box display={userInfo ? "flex" : "none"}>
                <Button
                  className="my-nav-btn"
                  to="/login"
                  sx={logOutStyles}
                  variant="contained"
                  onClick={onLogOut}
                >
                  Logout
                </Button>
                <Box sx={accountIconStyles}>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Box>
                {/* <Button
                  className="my-nav-btn"
                  sx={{ marginLeft: 1, background: "none" }}
                  variant="contained"
                >
                  <Link to="/signup">Signup</Link>
                </Button> */}
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
