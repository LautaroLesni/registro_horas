import CustomTextField from "../../CustomTextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useClearModalState } from "../../../hooks/useClearModalState";
import { createCompany, updateCompany } from "../../../redux/slices/company";

export default function CompanyForm() {
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const clearModalState = useClearModalState();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitFunction = (values) => {
    if (data.length === 0) {
      values.created_by = currentUser.id;
      dispatch(createCompany(values));
    } else {
      values.id = data.id;
      dispatch(updateCompany(values));
    }
    clearModalState();
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
      });
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit(submitFunction)}>
      <div className="flex justify-center bg-blue-200 mx-auto mb-5 p-2 font-semibold">{`${
        data?.id ? "EDITAR" : "CREAR"
      } EMPRESA`}</div>
      <div>
        <CustomTextField
          id="name"
          rules={{ required: true }}
          name="name"
          control={control}
          label="Nombre"
          disabled={false}
          errors={errors}
        />
      </div>
      <div>
        <Button type="submit" variant="outlined" fullWidth>
          Enviar
        </Button>
      </div>
    </form>
  );
}
