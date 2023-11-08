import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "./axiosInstance";
import { setCurrentUser, clearAccessToken } from "../redux/slices/auth";
import Notification from "../components/Notifications";

const ProtectedRoute = ({ children }) => {
  const { accessToken, currentUser } = useSelector((state) => state.auth);
  const [tokenInjected, setTokenInjected] = useState(false);
  /* console.log(accessToken); */
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const resolveToken = async () => {
      if (accessToken !== "") {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        setTokenInjected(true);
        /*  console.log(axiosInstance.defaults.headers.common["Authorization"]); */
        return () => {
          setTokenInjected(false);
        };
      }
    };
    resolveToken();
  }, [accessToken, location.pathname, dispatch]);

  if (tokenInjected && accessToken !== "") {
    return <Outlet />;
  } else if (!tokenInjected && accessToken !== "") {
    <div>Loading...</div>;
  } else if (accessToken === "") {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
