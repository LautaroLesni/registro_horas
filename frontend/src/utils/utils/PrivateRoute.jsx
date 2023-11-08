import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import axiosInstance from "./axiosInstance";
import { clearAccessToken, setCurrentUser } from "../redux/slices/auth";
import { setAccessRoutes } from "../redux/slices/sideBar";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function PrivateRoute({ children }) {
  const { accessToken, currentUser, loggedAt } = useSelector((state) => state.auth);
  const { accessRoutes, open } = useSelector((state) => state.sidebar);
  const [valid, setValid] = useState({ bool: false, type: null });
  const [LoggedAt, setLoggedAt] = useState("");
  const location = useLocation();
  const currentPathname = location.pathname;

  const dispatch = useDispatch();

  useEffect(() => {
    const verify = async () => {
      if (accessToken) {
        try {
          const loggedDate = loggedAt.split("T");
          setLoggedAt(loggedDate);
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

          const user = await axiosInstance.get("/auth/verify");
          if (!currentUser) await dispatch(setCurrentUser(user.data));

          if (!accessRoutes.maintainersLinks.length || !accessRoutes.usersLinks.length) {
            const routes = await axiosInstance.get("/routes-link");
            dispatch(setAccessRoutes(routes.data));

            const unifiedArray = [
              ...routes.data.maintainersLinks.map((obj) => obj.link),
              ...routes.data.usersLinks.map((obj) => obj.link),
            ];

            if (location.pathname !== "/") {
              if (!unifiedArray.includes(`/${location.pathname.split("/")[1]}`)) {
                return setValid({ bool: false, type: "role" });
              } else {
                return setValid({ bool: true });
              }
            }
          } else {
            const unifiedArray = [
              ...accessRoutes.maintainersLinks.map((obj) => obj.link),
              ...accessRoutes.usersLinks.map((obj) => obj.link),
            ];

            if (location.pathname !== "/" && location.pathname !== "/profile") {
              if (!unifiedArray.includes(`/${location.pathname.split("/")[1]}`)) {
                return setValid({ bool: false, type: "role" });
              } else {
                return setValid({ bool: true });
              }
            }
          }

          setValid({ bool: true });
        } catch (error) {
          setValid(false);
          dispatch(clearAccessToken());
          //console.log(error);
        }
      }
    };
    verify();
  }, [accessToken, location.pathname, dispatch]);

  if (!valid.bool && valid.type === "role") {
    return (
      <div className="w-full flex mt-[65px]">
        <ResponsiveAppBar />
        <SideBar />
        <div className={`${open ? "mainactive" : "maincontent"}`}>
          <div className="w-full flex justify-center items-center calculated-height">
            <div className="w-2/4">
              <Alert severity="error">
                <AlertTitle>401 - No tiene permisos para ingrensar a esta ruta</AlertTitle>
                {location.pathname} — <strong>No dudes en ponerte en contacto con el equipo de soporte</strong>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return valid.bool ? (
    <div className="w-full flex mt-[65px]">
      <ResponsiveAppBar />
      <SideBar />
      <div className={`${open ? "mainactive" : "maincontent"}`}>
        <Outlet />
      </div>
    </div>
  ) : accessToken ? (
    <div className="w-full flex h-screen">
      <ResponsiveAppBar />
      <div className={`w-full h-full flex justify-center items-center`}>
        <CircularProgress color="primary" />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
