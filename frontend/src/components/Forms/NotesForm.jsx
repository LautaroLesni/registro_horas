import ControlledTextField from "../ControlledInputs/ControlledTextField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { createNote } from "../../redux/slices/notes";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { IconButton } from "@mui/material";
import { filterByCategory } from "../../redux/slices/notes";

export default function NotesForm({ setOpen }) {
  const { currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const [categoriesToConnect, setCategoriesToConnect] = useState([]);

  const dispatch = useDispatch();
  /*  const clearModalState = useClearModalState(); */

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitFunction = (values) => {
    const dataToSend = {
      ...values,
      userId: currentUser.id,
      categoriesToConnect: categoriesToConnect.map((cat) => cat.id),
    };

    dispatch(createNote(dataToSend)).then((res) => {
      reset();
      setOpen(false);
    });
  };

  useEffect(() => {
    dispatch(filterByCategory(0));
  }, [data]);

  const handleChangeCategory = (e) => {
    setCategoriesToConnect([...categoriesToConnect, e.target.value]);
  };
  const handleDeleteCategoryCreate = (id) => {
    setCategoriesToConnect(categoriesToConnect.filter((cat) => cat.id !== id));
  };

  return (
    <form onSubmit={handleSubmit(submitFunction)}>
      <div className="flex justify-center bg-blue-200 mx-auto mb-5 p-2 font-semibold">{`${
        0 > 1 ? "EDITAR" : "CREAR"
      } NOTA`}</div>
      <div>
        <ControlledTextField
          id="label"
          rules={{ required: true }}
          name="label"
          control={control}
          label="Etiqueta"
          disabled={false}
          errors={errors}
        />
      </div>
      <div>
        <ControlledTextField
          id="description"
          rules={{ required: true }}
          name="description"
          control={control}
          label="Descripción"
          disabled={false}
          multiline={true}
          errors={errors}
        />
      </div>
      <div /* className="w-[full] h-auto  rounded-sm border border-gray-500 " */>
        <TextField
          name="categoriesToConnect"
          className="pb-1 w-[100%]"
          id="outlined-basic"
          label="Categorias"
          select
          size="small"
          sx={{
            "& .MuiInputBase-inputRequisitoMui-disabled": {
              WebkitTextFillColor: "#707070",
            },
            mt: 2,
          }}
          /* value={inputRequisito.requisito} */
          onChange={handleChangeCategory}
        >
          {categories?.map((cat) => (
            <MenuItem key={cat.id} value={cat}>
              {cat.description}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="flex gap-2 mt-2 flex-wrap">
        {categoriesToConnect?.map((cat) => (
          <div key={cat.id} className="px-2 rounded border border-[#f9b17a] flex items-center">
            <span className="text-white">{cat.description}</span>

            <IconButton onClick={() => handleDeleteCategoryCreate(cat.id)}>
              <BackspaceIcon sx={{ width: "20px", height: "20px", color: "gray" }} />
            </IconButton>
          </div>
        ))}
      </div>
      <div>
        <Button type="submit" variant="outlined" fullWidth sx={{ mt: 2 }}>
          Enviar
        </Button>
      </div>
    </form>
  );
}
