import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { registerUser } from "../../../redux/slices/auth";
import { useDispatch } from "react-redux";

const Register = ({ setStatus, setRegisteredSuccess }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const setSuccess = () => {
    reset();
    setStatus(0);
    setRegisteredSuccess(true);
  };
  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerUser(data, setSuccess));
  };

  return (
    <div className="h-[80%] w-full flex flex-col justify-center items-center">
      <h1 className="text-[#ffffff] text-4xl mb-5">Registrarse</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[55%]">
        <div>
          <TextField
            label="Nombre"
            variant="outlined"
            sx={{ width: "100%" }}
            {...register("name", { required: true })}
          />
          <span className="text-xs text-red-500">{errors?.name?.type === "required" && "El nombre es requerido"}</span>
        </div>
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
          Registrarse
        </Button>
      </form>
    </div>
  );
};

export default Register;
