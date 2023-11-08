import React from "react";
import ArchivesView from "../../components/ArchivesIndex/ArchivesView";
import Notification from "../../components/Notifications";

const Archives = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#2d3250] flex justify-center items-center">
      <ArchivesView />
      <Notification />;
    </div>
  );
};

export default Archives;
