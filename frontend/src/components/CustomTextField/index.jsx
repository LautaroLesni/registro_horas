import React from "react";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller } from "react-hook-form";

const CustomTextField = ({ id, name, control, value, label, disabled, errors, rules, type = "text" }) => {
  const ListOfErrors = {
    required: "Campo requerido",
    validarRut: "Rut invalido",
    pattern: "Email incorrecto",
  };

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-[70px]">
      <Controller
        id={id}
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            size="small"
            onChange={onChange}
            value={value || ""}
            label={label}
            disabled={disabled}
            error={!!errors[name]}
            helperText={errors[name] && ListOfErrors[errors[name].type]}
            placeholder=""
            InputProps={
              type === "password"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {}
            }
            sx={{
              "& .MuiFormHelperText-root": {
                marginLeft: 0,
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default CustomTextField;
