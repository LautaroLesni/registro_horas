import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAccessToken, clearCurrentUser } from "../../redux/slices/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ArchiveIcon from "@mui/icons-material/Archive";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

export default function TemporaryDrawer() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogOut = () => {
    dispatch(clearAccessToken());
    dispatch(clearCurrentUser());
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to={"/registro-horas"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <QueryBuilderIcon />{" "}
              </ListItemIcon>
              <ListItemText primary={"Horas"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/notes"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon />{" "}
              </ListItemIcon>
              <ListItemText primary={"Notas"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/categories"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={"Categorias"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/archives"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary={"Archivados"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <div onClick={handleLogOut}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {" "}
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Log out"} />
            </ListItemButton>
          </ListItem>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon color="primary" />
        </IconButton>
        <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
