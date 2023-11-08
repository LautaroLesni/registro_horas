import CustomTextField from "../../CustomTextField";
import CustomSelectedField from "../../CustomSelectedField";
import CustomSwich from "../../CustomSwich";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useClearModalState } from "../../../hooks/useClearModalState";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function PositionsForm() {
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.modal);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const clearModalState = useClearModalState();
  const [positionError, setPositionError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitFunction = async (values) => {
    setPositionError(null);
    if (data.length === 0) {
      //CREATE
      //CREATE
    } else {
      //UPDATE
      //UPDATE
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
      });
    }
  }, [data]);

  const initialize = async () => {
    /* await dispatch(getAllPositionsSelect()); */
    setInitialized(true);
  };
  useEffect(() => {
    initialize();
  }, []);

  return initialized ? (
    <form onSubmit={handleSubmit(submitFunction)}>
      <div className="flex justify-center bg-blue-200 mx-auto mb-5 p-2 font-semibold">{`${
        data?.id ? "EDITAR" : "CREAR"
      } CARGO`}</div>
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
      <div>
        {positionError && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{positionError}</Alert>
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
