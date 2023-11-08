import React from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterByCategory } from "../../redux/slices/notes";

const NotesToolBar = ({ handleOpenCreateNote, handleOpenCreateCategory, categories, type = "notes" }) => {
  const dispatch = useDispatch();
  const handleChangeCategory = (e) => {
    dispatch(filterByCategory(e.target.value));
  };
  return (
    <div className=" flex justify-center w-[100%]">
      {type === "notes" ? (
        <div className="flex justify-around gap-3 w-[80%] border border-gray-600 p-5 rounded-lg">
          <Button variant="outlined" onClick={handleOpenCreateNote} sx={{ height: "38px", width: "100%" }}>
            Crear Nota
          </Button>
          <Button
            variant="outlined"
            onClick={handleOpenCreateCategory}
            color="success"
            sx={{ height: "38px", width: "100%" }}
          >
            Crear Categoria
          </Button>
          <Link className="w-[350px]" to="/archives">
            <Button variant="outlined" color="info" sx={{ height: "38px" }}>
              Archivados
            </Button>
          </Link>
          <TextField
            name="categories"
            className="pb-1 w-[100%]"
            id="outlined-basic"
            label="Categorias"
            select
            size="small"
            sx={{
              "& .MuiInputBase-inputRequisitoMui-disabled": {
                WebkitTextFillColor: "#707070",
              },
            }}
            /* value={inputRequisito.requisito} */
            onChange={handleChangeCategory}
          >
            <MenuItem value={0}>Todos</MenuItem>
            {categories?.map((cat) => (
              <MenuItem key={cat.id} value={cat}>
                {cat.description}
              </MenuItem>
            ))}
          </TextField>
        </div>
      ) : (
        <div className="flex justify-center gap-3 w-[80%] border border-gray-600 p-5 rounded-lg">
          <Link className="w-[350px]" to="/notes">
            <Button variant="outlined" color="primary" sx={{ height: "38px", width: "100%" }}>
              Volver a todas
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default NotesToolBar;
