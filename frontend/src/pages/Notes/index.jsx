import React from "react";
import NotesView from "../../components/NotesIndex/NotesView";
import Notification from "../../components/Notifications";

const Notes = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#2d3250] flex justify-center items-center">
      <NotesView />
      <Notification />;
    </div>
  );
};

export default Notes;
