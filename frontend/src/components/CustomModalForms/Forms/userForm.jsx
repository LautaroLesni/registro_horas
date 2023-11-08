import CustomSelectedField from "../../CustomSelectedField";
import CustomTextField from "../../CustomTextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRolesSelect } from "../../../redux/slices/roles";
import { getAllPositionsSelect } from "../../../redux/slices/positions";
import { createUser, updateUser } from "../../../redux/slices/users";
import { useClearModalState } from "../../../hooks/useClearModalState";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { validateRUT } from "validar-rut";

export default function UserForm() {
  const { rolesSelect } = useSelector((state) => state.roles);
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.modal);
  const { positionsSelect } = useSelector((state) => state.positions);

  const [userError, setUserError] = useState(null);
  //espera para que cargue informacion.
  const [initialized, setInitialized] = useState(false);

  const dispatch = useDispatch();
  const clearModalState = useClearModalState();

  const {
    control,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();

  const submitFunction = async (values) => {
    const relations = {};
    values.relations = relations;
    setUserError(null);
    // VALIDA DUPLICADOS
    if (data.length === 0) {
      values.created_by = currentUser.id;
      const respuesta = await dispatch(createUser(values));
      if (respuesta?.error) {
        setUserError(respuesta.error);
      } else {
        clearModalState();
      }
    } else {
      values.id = data.id;
      values.responsable = currentUser.id;
      const respuesta = await dispatch(updateUser(values));
      if (respuesta?.error) {
        setUserError(respuesta.error);
      } else {
        clearModalState();
      }
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        rut: data.rut,
        phone: data.phone,
        email: data.email,
        password: data.password,
        confirm_password: data.password,
        role_id: data.role_id,
        position_id: data.position_id,
      });
    }
  }, [data]);

  const initialize = async () => {
    await dispatch(fetchRolesSelect());
    await dispatch(getAllPositionsSelect());
    setInitialized(true);
  };
  useEffect(() => {
    initialize();
  }, []);

  return initialized ? (
    <form onSubmit={handleSubmit(submitFunction)}>
      <div className="flex justify-center w-[95%] bg-blue-200 mx-auto mb-5 p-2 font-semibold">{`${
        data?.id ? "EDITAR" : "CREAR"
      } USUARIO`}</div>
      <div className="flex justify-around">
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
        <div className="w-[45%]">
          <CustomTextField
            id="rut"
            name="rut"
            rules={{ required: true, validate: { validarRut } }}
            control={control}
            label="Rut"
            disabled={false}
            errors={errors}
          />
        </div>
      </div>
      <div className="flex justify-around">
        <div className="w-[45%]">
          <CustomTextField
            id="phone"
            name="phone"
            rules={{ required: true }}
            control={control}
            label="Teléfono"
            disabled={false}
            errors={errors}
          />
        </div>
        <div className="w-[45%]">
          <CustomTextField
            id="email"
            name="email"
            rules={{ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }}
            control={control}
            label="Mail"
            disabled={false}
            errors={errors}
          />
        </div>
      </div>

      <div className="flex justify-around">
        <div className="w-[45%]">
          <CustomTextField
            id="password"
            name="password"
            rules={!data.name && { required: true }}
            control={control}
            label="Contraseña"
            type="password"
            disabled={false}
            errors={errors}
          />
        </div>
        <div className="w-[45%]">
          <CustomTextField
            id="confirm_password"
            name="confirm_password"
            rules={!data.name && { required: true }}
            control={control}
            label="Repetir contraseña"
            type="password"
            disabled={false}
            errors={errors}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[95%]">
          <CustomSelectedField
            id="role_id"
            name="role_id"
            rules={{ required: true }}
            control={control}
            label="Rol"
            disabled={false}
            errors={errors}
            options={rolesSelect}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-[95%]">
          <CustomSelectedField
            id="position_id"
            name="position_id"
            rules={{ required: true }}
            control={control}
            label="Cargo"
            disabled={false}
            errors={errors}
            options={positionsSelect}
          />
        </div>
      </div>

      <div className="w-[95%] m-auto mb-2">
        <Button variant="outlined" type="submit" fullWidth>
          Enviar Formulario
        </Button>
      </div>
      <div>
        {userError && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{userError}</Alert>
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

const validarRut = (value) => {
  return validateRUT(value);
};
