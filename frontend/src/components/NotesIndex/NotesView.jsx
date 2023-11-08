import React from "react";
import MenuAppBar from "../Navbar/Navbar";
import CustomizedAccordion from "../Accordion/CustomizedAccordion";
import CreateForm from "../ModalForm/CreateForm";
import NotesForm from "../Forms/NotesForm";
import CategoryForm from "../Forms/CategoryForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { fetchCategories } from "../../redux/slices/categories";
import { fetchNotes } from "../../redux/slices/notes";
import NotesToolBar from "./NotesToolBar";

const NotesView = () => {
  const [openCreateNote, setOpenCreateNote] = useState(false);
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const { notes } = useSelector((state) => state.notes);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleOpenCreateNote = () => {
    setOpenCreateNote(true);
  };
  const handleOpenCreateCategory = () => {
    setOpenCreateCategory(true);
  };

  useEffect(() => {
    dispatch(fetchCategories(currentUser.id));
    dispatch(fetchNotes(currentUser.id));
  }, [dispatch]);

  return (
    <div className="w-[100vw] h-[100vh]">
      <MenuAppBar />
      <CreateForm
        form={<CategoryForm setOpen={setOpenCreateCategory} />}
        setOpen={setOpenCreateCategory}
        openValue={openCreateCategory}
      />
      <CreateForm
        form={<NotesForm setOpen={setOpenCreateNote} />}
        setOpen={setOpenCreateNote}
        openValue={openCreateNote}
      />
      <div className="w-[100%] h-[calc(100vh_-_64px)]  flex justify-center items-center flex-col relative">
        <h1 className="text-[#ffffff] mb-10 absolute top-12">Notes View</h1>
        <div className="flex flex-col items-center w-[60%] h-[600px] bg-[#121212] rounded-lg relative">
          <div className="w-[100%]  mt-5">
            <NotesToolBar
              handleOpenCreateCategory={handleOpenCreateCategory}
              handleOpenCreateNote={handleOpenCreateNote}
              categories={categories}
            />
          </div>
          <div
            className={`w-[100%] h-[100%]  flex justify-center ${notes.length > 0 ? "items-start" : "items-center"} `}
          >
            <CustomizedAccordion notes={notes} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotesView;
