import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const ControlledTextField = ({
  id,
  name,
  control,
  value,
  label,
  disabled,
  errors,
  rules,
  type = "text",
  multiline = false,
  rows = 4,
}) => {
  const ListOfErrors = {
    required: "Campo requerido",
  };

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
            type={type}
            size="small"
            onChange={onChange}
            value={value || ""}
            label={label}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            error={!!errors[name]}
            helperText={errors[name] && ListOfErrors[errors[name].type]}
            placeholder=""
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

export default ControlledTextField;
