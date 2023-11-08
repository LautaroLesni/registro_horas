import React from "react";
import CategoriesView from "../../components/CategoriesIndex/CategoriesView";
import Notification from "../../components/Notifications";

const Categories = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#2d3250] flex justify-center items-center">
      <CategoriesView />
      <Notification />;
    </div>
  );
};

export default Categories;
