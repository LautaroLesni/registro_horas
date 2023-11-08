import Autocomplete from "@mui/material/Autocomplete";
import { TextField, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomSelectedField = ({ id, name, control, value, label, disabled, errors, rules, options }) => {
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
            select
            size="small"
            onChange={onChange}
            value={value || ""}
            label={label}
            disabled={disabled}
            error={!!errors[name]}
            helperText={errors[name] && ListOfErrors[errors[name].type]}
            placeholder=""
            sx={{
              "& .MuiFormHelperText-root": {
                marginLeft: 0,
              },
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              },
            }}
          >
            {options?.map((option) =>
              option.id ? (
                <MenuItem key={option.id} dense divider value={option.id}>
                  {option.name}
                </MenuItem>
              ) : (
                <MenuItem key={option} dense divider value={option}>
                  {option}
                </MenuItem>
              )
            )}
          </TextField>
        )}
      />
    </div>
  );
};

export default CustomSelectedField;
