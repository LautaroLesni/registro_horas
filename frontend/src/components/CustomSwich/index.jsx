import * as React from "react";
import Switch from "@mui/material/Switch";

export default function CustomSwich({ setChecked, checked }) {
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="min-h-[70px] flex items-center">
      <Switch checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
      {checked ? <span>SI</span> : <span>NO</span>}
    </div>
  );
}
