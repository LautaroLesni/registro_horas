import ControlledTextField from "../ControlledInputs/ControlledTextField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { updateNote } from "../../redux/slices/notes";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { IconButton } from "@mui/material";

import { Box, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function NotesFormEdit({ data }) {
  const [edit, setEdit] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const [categoriesToConnect, setCategoriesToConnect] = useState([]);
  const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
  const [categoriesToDisconnect, setCategoriesToDisconnect] = useState([]);

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
      categoriesToDisconnect: categoriesToDisconnect,
    };

    dispatch(updateNote(data?.id, dataToSend)).then((res) => {
      reset();
      setEdit(false);
    });
  };

  const handleEditlClose = () => {
    setEdit(false);
  };
  const handleEditlOpen = () => {
    setEdit(true);
  };

  useEffect(() => {
    if (data) {
      reset({
        label: data?.label,
        description: data?.description,
      });
      setCategoriesToDisplay(data?.categories?.map((cat) => cat.category));
      return () => {
        setCategoriesToDisconnect([]);
      };
    }
  }, [data]);

  /*   useEffect(() => {
    console.log(categoriesToDisconnect, "desconectar");
    console.log(categoriesToConnect, "conectar");
    console.log(categoriesToDisplay, "mostrar");
  }, [categoriesToDisconnect, categoriesToConnect, categoriesToDisplay]); */

  const handleChangeCategory = (e) => {
    setCategoriesToDisplay([...categoriesToDisplay, e.target.value]);
    const alreadyConnected = data?.categories.map((cat) => cat.category).find((cat) => cat.id === e.target.value.id);
    if (!alreadyConnected) {
      setCategoriesToConnect([...categoriesToConnect, e.target.value]);
    }
    setCategoriesToDisconnect(categoriesToDisconnect.filter((id) => id !== e.target.value.id));
  };
  const handleDeleteCategoryEdit = (id) => {
    setCategoriesToConnect(categoriesToConnect.filter((cat) => cat.id !== id));
    setCategoriesToDisplay(categoriesToDisplay.filter((cat) => cat.id !== id));
    const alreadyDisconnected = categoriesToDisconnect.find((catId) => catId === id);
    if (!alreadyDisconnected) {
      setCategoriesToDisconnect([...categoriesToDisconnect, id]);
    }
  };

  return (
    <div>
      <IconButton onClick={handleEditlOpen}>
        <EditIcon />
      </IconButton>
      <Modal
        style={{ overflow: "scroll" }}
        open={edit}
        onClose={handleEditlClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(submitFunction)}>
            <div className="flex justify-center bg-blue-200 mx-auto mb-5 p-2 font-semibold">EDITAR NOTA</div>
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
              {categoriesToDisplay?.map((cat) => (
                <div key={cat.id} className="px-2 rounded border border-[#f9b17a] flex items-center">
                  <span className="text-white">{cat.description}</span>

                  <IconButton onClick={() => handleDeleteCategoryEdit(cat.id)}>
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
        </Box>
      </Modal>
    </div>
  );
}
