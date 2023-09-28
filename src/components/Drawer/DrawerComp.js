import React, { useState } from "react";

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

const DrawerComp = ({ links, isMatch }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer
        className="my-drawer"
        PaperProps={{
          sx: {
            backgroundColor: "rgba(49,49,116,1)",
            width: "65%",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          <h1 className="drawer-header">Dummy JSON Shop</h1>
          {links.map((link, idx) => (
            <ListItemButton onClick={() => setOpen(false)} key={idx} divider>
              <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                <ListItemText sx={{ color: "white" }}>{link}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
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
