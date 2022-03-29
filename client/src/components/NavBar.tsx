import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { logoutTC } from "../bll/authReducer/authReducerThunkCreators";
import { useDispatch } from "react-redux";

export const NavBar = () => {
  const buttonStyle = {
    textDecoration: "none",
    color: "white",
  };
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Link Shortener by DvK
          </Typography>
          <Typography variant="h6" component="div">
            <Button
              variant={"contained"}
              color={"secondary"}
              style={{ marginRight: "25px" }}
            >
              <NavLink to={"/links"} style={buttonStyle}>
                Links
              </NavLink>
            </Button>
            <Button
              variant={"contained"}
              color={"secondary"}
              style={{ marginRight: "25px" }}
            >
              <NavLink to={"/spotify"} style={buttonStyle}>
                Spotify
              </NavLink>
            </Button>
            <Button color="inherit" onClick={() => dispatch(logoutTC())}>
              Logout
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
