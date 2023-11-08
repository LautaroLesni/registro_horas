import React from "react";
import MenuAppBar from "../Navbar/Navbar";
import DataGridComponent from "../DataGridComponent";
import { dataColumns } from "../../hooks/useDataGrid/columns/dataCategory";
import useDataGrid from "../../hooks/useDataGrid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories, deleteCategories } from "../../redux/slices/categories";
import CategoryForm from "../Forms/CategoryForm";
import EditForm from "../ModalForm/EditForm";
import DeleteModal from "../ModalForm/DeleteModal";
import CreateForm from "../ModalForm/CreateForm";
import { Button } from "@mui/material";

const CategoriesView = () => {
  const { categories } = useSelector((state) => state.categories);
  const { currentUser } = useSelector((state) => state.auth);
  const [column, formData] = useDataGrid(dataColumns);
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteCategories(id));
  };
  useEffect(() => {
    dispatch(fetchCategories(currentUser.id));
  }, []);
  const handleOpenCreateCategory = () => {
    setOpenCreateCategory(true);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <MenuAppBar />
      <div className="w-[100%] h-[calc(100vh_-_64px)]  flex flex-col justify-center items-center">
        <h1 className="text-[#ffffff]">Categories View</h1>
        <CreateForm
          form={<CategoryForm setOpen={setOpenCreateCategory} />}
          setOpen={setOpenCreateCategory}
          openValue={openCreateCategory}
        />
        <Button
          variant="outlined"
          onClick={handleOpenCreateCategory}
          color="success"
          sx={{ height: "38px", width: "auto", mt: 5 }}
        >
          Crear Categoria
        </Button>
      </div>
      <div className="w-full h-full flex justify-center">
        <div className="w-[800px]">
          <DataGridComponent columns={column} rows={categories} />
          <EditForm
            data={formData}
            form={<CategoryForm data={formData} type="EDITAR" setOpen={formData.editSetter} />}
          />
          <DeleteModal handleDelete={handleDelete} data={formData} setterOpen={formData.editSetter} />
        </div>
      </div>
    </div>
  );
};
export default CategoriesView;
