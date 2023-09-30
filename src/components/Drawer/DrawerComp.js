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
