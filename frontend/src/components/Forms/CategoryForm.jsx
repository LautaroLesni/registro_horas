import ControlledTextField from "../ControlledInputs/ControlledTextField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { createCategory, updateCategory } from "../../redux/slices/categories";
import { useEffect } from "react";

export default function CategoryForm({ setOpen, type = "CREAR", data }) {
  const { currentUser } = useSelector((state) => state.auth);

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
    };
    if (type === "CREAR") {
      dispatch(createCategory(dataToSend)).then((res) => {
        reset();
        setOpen(false);
      });
    } else {
      dispatch(updateCategory(data?.data?.id, values)).then((res) => {
        reset();
        setOpen({ ...data, open: false });
      });
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        description: data.data.description,
      });
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit(submitFunction)}>
      <div className="flex justify-center bg-green-200 mx-auto mb-5 p-2 font-semibold">{`${
        type === "EDITAR" ? "EDITAR" : "CREAR"
      } CATEGORIA`}</div>
      <div>
        <ControlledTextField
          id="description"
          rules={{ required: true }}
          name="description"
          control={control}
          label="Etiqueta"
          disabled={false}
          errors={errors}
        />
      </div>
      <div>
        <Button type="submit" variant="outlined" fullWidth>
          {type === "EDITAR" ? "Editar" : "Crear"}
        </Button>
      </div>
    </form>
  );
}
