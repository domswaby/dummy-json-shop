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
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";

const NavBar = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, cart } = useContext(AppContext);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogOut = () => {
    setUserInfo(null);
    navigate("/login");
  };

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
  const goToShop = () => {
    navigate("/");
    navigate("/");
  };
  const goToCart = () => {
    navigate("/cart");
  };
  const goToAccount = () => {
    navigate("/account");
  };
  const goToTransactions = () => {
    navigate("/transactions");
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
              <Link to="/">
                <StoreIcon />
              </Link>
            </Typography>

            <DrawerComp />
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
            <Grid item xs={6}>
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
                    onClick={goToCart}
                  >
                    <Badge
                      badgeContent={
                        userInfo && cart && cart[userInfo.id]
                          ? cart[userInfo.id].products.length
                          : 0
                      }
                      color="error"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Box>

                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={goToAccount}>My account</MenuItem>
                    <MenuItem onClick={goToShop}>Shop</MenuItem>
                    <MenuItem onClick={goToCart}>Cart</MenuItem>
                    <MenuItem onClick={goToTransactions}>Transactions</MenuItem>
                  </Menu>
                </div>
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
