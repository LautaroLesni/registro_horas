import React from "react";
import AuthForm from "../../components/HomeIndex/AuthForm/AuthForm";
import { useSelector } from "react-redux";
import IndexView from "../../components/HomeIndex/IndexView";
import Notification from "../../components/Notifications";

const Home = () => {
  const { accessToken } = useSelector((state) => state.auth);
  return (
    <div className="w-[100vw] h-[100vh] bg-[#2d3250] flex justify-center items-center">
      {accessToken === "" ? <AuthForm /> : <IndexView />}
      <Notification />;
    </div>
  );
};

export default Home;
