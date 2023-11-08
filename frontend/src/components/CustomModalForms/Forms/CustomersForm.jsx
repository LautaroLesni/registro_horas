import CustomTextField from "../../CustomTextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useClearModalState } from "../../../hooks/useClearModalState";
import { createCustomers, updateCustomers, getAllCustomersSelect } from "../../../redux/slices/customers";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function CustomersForm() {
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.modal);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const clearModalState = useClearModalState();
  const [customersError, setCustomersError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const submitFunction = async (values) => {
    setCustomersError(null);
    if (data.length === 0) {
      values.created_by = currentUser.id;
      const respuesta = await dispatch(createCustomers(values));
      if (respuesta?.error) {
        setCustomersError(respuesta.error);
      } else {
        clearModalState();
      }
    } else {
      values.id = data.id;
      const respuesta = await dispatch(updateCustomers(values));
      if (respuesta?.error) {
        setCustomersError(respuesta.error);
      } else {
        clearModalState();
      }
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        address: data.address,
        phone: data.phone,
        contact: data.contact,
        email: data.email,
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
      } CLIENTE`}</div>

      <div className="flex justify-around">
        <div className="w-[45%]">
          <CustomTextField
            id="name"
            rules={{ required: true }}
            name="name"
            control={control}
            label="Cliente"
            disabled={false}
            errors={errors}
          />
        </div>
        <div className="w-[45%]">
          <CustomTextField
            id="address"
            name="address"
            rules={{ required: true }}
            control={control}
            label="Dirección"
            disabled={false}
            errors={errors}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-[95%]">
          <CustomTextField
            id="contact"
            rules={{ required: true }}
            name="contact"
            control={control}
            label="Contacto"
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

      <div>
        <Button type="submit" variant="outlined" fullWidth>
          Enviar
        </Button>
      </div>
      <div>
        {customersError && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{customersError}</Alert>
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
