import React, { useState, useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import "./Drawer.css";
import { useNavigate } from "react-router-dom";

const DrawerComp = () => {
  const { setUserInfo, userInfo } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOnLogOut = () => {
    setOpen(false);
    setUserInfo(null);
    navigate("/login");
  };

  return (
    <>
      <Drawer
        className="my-drawer"
        PaperProps={{
          sx: {
            background:
              "linear-gradient(180deg, rgba(180, 58, 58, 1) 2%, rgba(49, 49, 116, 1) 36%, rgba(105, 0, 161, 1) 73%, rgba(166, 69, 252, 1) 100%);",
            width: "65%",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          <h1 className="drawer-header">Dummy JSON Shop</h1>
          <ListItemButton onClick={() => navigate("/")} divider>
            <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
              <ListItemText sx={{ color: "white" }}>Shop</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          {userInfo && (
            <>
              <ListItemButton onClick={() => navigate("/cart")} divider>
                <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                  <ListItemText sx={{ color: "white" }}>Cart</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/account")} divider>
                <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                  <ListItemText sx={{ color: "white" }}>Account</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/transactions")} divider>
                <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                  <ListItemText sx={{ color: "white" }}>
                    Transactions
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton onClick={() => handleOnLogOut()} divider>
                <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                  <ListItemText sx={{ color: "white" }}>Logout</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          )}

          {!userInfo && (
            <>
              <ListItemButton onClick={() => navigate("/login")} divider>
                <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                  <ListItemText sx={{ color: "white" }}>Login</ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton onClick={() => navigate("/signup")} divider>
                <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                  <ListItemText sx={{ color: "white" }}>Sign up</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setOpen(!open)}
      >
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
