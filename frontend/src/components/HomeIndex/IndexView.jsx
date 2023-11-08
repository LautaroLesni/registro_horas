import React from "react";
import MenuAppBar from "../Navbar/Navbar";
import { useSelector } from "react-redux";

const IndexView = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <div className="w-[100vw] h-[100vh]">
      <MenuAppBar />
      <div className="w-[100%] h-[calc(100vh_-_64px)]  flex justify-center items-center">
        <h1 className="text-[#ffffff]">{`Bienvenido ${currentUser?.name}`}</h1>
      </div>
    </div>
  );
};

export default IndexView;
