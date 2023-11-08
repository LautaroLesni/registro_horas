import CustomTextField from "../../CustomTextField";
import CustomSelectedField from "../../CustomSelectedField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useClearModalState } from "../../../hooks/useClearModalState";
import { createProject, updateProject } from "../../../redux/slices/project";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { getAllCustomersSelect } from "../../../redux/slices/customers";

export default function ProjectForm() {
  const { customersSelect } = useSelector((state) => state.customers);
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  const clearModalState = useClearModalState();

  const [projectError, setProjectError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitFunction = async (values) => {
    setProjectError(false);
    const relations = {};
    values.relations = relations;
    // VALIDA DUPLICADOS
    if (data.length === 0) {
      values.created_by = currentUser.id;
      const respuesta = await dispatch(createProject(values));
      if (respuesta?.error) {
        setProjectError(respuesta.error);
      } else {
        clearModalState();
      }
    } else {
      values.id = data.id;
      values.created_by = currentUser.id;
      const respuesta = await dispatch(updateProject(values));
      if (respuesta?.error) {
        setProjectError(respuesta.error);
      } else {
        clearModalState();
      }
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        code: data.code,
        customer_id: data.customer_id,
      });
    }
  }, [data]);

  const initialize = async () => {
    await dispatch(getAllCustomersSelect());
    setInitialized(true);
  };
  useEffect(() => {
    initialize();
  }, []);

  return initialized ? (
    <form onSubmit={handleSubmit(submitFunction)}>
      <div className="flex justify-center bg-blue-200 mx-auto mb-5 p-2 font-semibold">{`${
        data?.id ? "EDITAR" : "CREAR"
      } PROYECTO`}</div>

      <div className="flex justify-around">
        <div className="w-[45%]">
          <CustomTextField
            id="code"
            rules={{ required: true }}
            name="code"
            control={control}
            label="Código"
            disabled={false}
            errors={errors}
          />
        </div>
        <div className="w-[45%]">
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
      </div>

      <div className="flex justify-center">
        <div className="w-[95%]">
          <CustomSelectedField
            id="customer_id"
            name="customer_id"
            rules={{ required: true }}
            control={control}
            label="Cliente"
            disabled={false}
            errors={errors}
            options={customersSelect}
          />
        </div>
      </div>

      <div className="w-[95%] m-auto mb-2">
        <Button variant="outlined" type="submit" fullWidth>
          Enviar Formulario
        </Button>
      </div>
      <div>
        {projectError && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{projectError}</Alert>
          </Stack>
        )}
      </div>
    </form>
  ) : (
    <div className="contenedorCentrado h-[533.66px]">
      <div className="spinner"></div>
    </div>
  );
}
