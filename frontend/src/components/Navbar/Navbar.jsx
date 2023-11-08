import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useSelector } from "react-redux";
import TemporaryDrawer from "./Drawer";
import { useDispatch } from "react-redux";
import { clearAccessToken, clearCurrentUser } from "../../redux/slices/auth";
import LogoutIcon from "@mui/icons-material/Logout";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dispatch(clearAccessToken());
    dispatch(clearCurrentUser());
    setAnchorEl(null);
  };

  return (
    accessToken !== "" && (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <TemporaryDrawer />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Useful App
            </Typography>
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
                <MenuItem sx={{ display: "flex", gap: "5px" }} onClick={handleLogOut}>
                  <LogoutIcon /> Log out
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    )
  );
}
