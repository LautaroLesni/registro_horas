import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Tooltip } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function CustomMultipleField({ id, value, label, onChange, optionsIds, optionsName }) {
  const theme = useTheme();
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <div className="">
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Autocomplete
          multiple
          size="small"
          fullWidth
          id={id}
          value={value || []}
          options={optionsIds}
          onChange={(event, newValue) => handleChange(newValue)}
          getOptionLabel={(option) => optionsName[option]}
          renderInput={(params) => <TextField {...params} variant="outlined" label={label} />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Tooltip key={index} title={optionsName[option]}>
                <Chip
                  variant="outlined"
                  size="small"
                  color="primary"
                  sx={{ width: "30%" }}
                  label={optionsName[option]}
                  {...getTagProps({ index })}
                />
              </Tooltip>
            ))
          }
        />
      </Box>
    </div>
  );
}

// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
//   };
// }

// export default function CustomMultipleField({
//   id,
//   name,
//   control,
//   value,
//   label,
//   disabled,
//   errors,
//   rules,
//   options,
//   onChange,
// }) {
//   const theme = useTheme();

//   const handleChange = (event) => {
//     const selected = event.target.value;
//     onChange(typeof selected === "string" ? selected.split(",") : selected);
//   };
//   return (
//     <div className="min-h-[70px]">
//       <Box
//         sx={{
//           display: "flex",
//         }}
//       >
//         <FormControl sx={{ width: "100%" }}>
//           <InputLabel id={id} sx={{ marginTop: "-5px" }}>
//             {label}
//           </InputLabel>
//           <Select
//             labelId={id}
//             size="small"
//             id={id}
//             multiple
//             value={value || []}
//             onChange={handleChange}
//             input={<OutlinedInput id={`select-${id}`} label={label} />}
//             renderValue={(selected) => (
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                 {selected.map((item) => (
//                   <div key={item} className="bg-[#3b79bd] px-2 text-white">
//                     {options.find((el) => el.id === item)?.name}
//                   </div>
//                 ))}
//               </Box>
//             )}
//             MenuProps={MenuProps}
//           >
//             {options?.map((option) => (
//               <MenuItem
//                 key={option.id}
//                 value={option.id}
//                 style={getStyles(
//                   option.id,
//                   value?.map((item) => item.id),
//                   theme
//                 )}
//               >
//                 {option.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>
//     </div>
//   );
// }
