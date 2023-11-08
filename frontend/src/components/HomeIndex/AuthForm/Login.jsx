import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { logInUser } from "../../../redux/slices/auth";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";

const Login = ({ registeredSuccess }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(logInUser(data));
  };
  return (
    <div className="h-[85%] w-full flex flex-col justify-center items-center relative">
      {registeredSuccess && (
        <Alert
          icon={false}
          severity="info"
          sx={{
            position: "absolute",
            top: "15%",
            display: "flex",
            justifyContent: "center",
            fontWeight: "medium",
            width: "280px",
          }}
        >
          Cuenta registrada correctamente
        </Alert>
      )}
      <h1 className="text-[#ffffff] text-4xl mb-5">Iniciar sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[55%]">
        <div>
          <TextField
            label="Email"
            variant="outlined"
            sx={{ width: "100%" }}
            {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
          />
          <span className="text-xs text-red-500">
            {errors?.email?.type === "required"
              ? "El email es requerido"
              : errors?.email?.type === "pattern"
              ? "Email invalido"
              : null}
          </span>
        </div>
        <div>
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            sx={{ width: "100%" }}
            {...register("password", { required: true })}
          />
          <span className="text-xs text-red-500">
            {errors?.password?.type === "required" && "La contraseña es requerida"}
          </span>
        </div>
        <Button type="submit" variant="contained" size="large" sx={{ color: "white", fontWeight: "semi-bold" }}>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
