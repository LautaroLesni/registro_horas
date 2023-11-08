import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import DensityLargeIcon from "@mui/icons-material/DensityLarge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { useState } from "react";

const Density = ({ setDensity }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleDensity = (value) => {
    setDensity(value);
  };

  return (
    <div className="sm:mb-4 mb-2 w-full md:w-auto">
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        fullWidth
        size="small"
        variant="outlined"
        sx={{ borderRadius: 50, minWidth: 125 }}
      >
        <div className="flex gap items-center gap-1">
          <FormatAlignJustifyIcon fontSize="small" />
          <div>Densidad</div>
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mt: 0.5 }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="min-w-[145px]">
          <MenuItem dense onClick={() => handleDensity({ row: "p-1", column: "px-1" })}>
            <DensitySmallIcon color="primary" sx={{ mr: 1 }} fontSize="small" />
            Compacta
          </MenuItem>
          <MenuItem dense onClick={() => handleDensity({ row: "p-2", column: "px-2" })}>
            <DensityMediumIcon color="primary" sx={{ mr: 1 }} fontSize="small" />
            Estándar
          </MenuItem>
          <MenuItem dense onClick={() => handleDensity({ row: "p-3", column: "px-3" })}>
            <DensityLargeIcon color="primary" sx={{ mr: 1 }} fontSize="small" />
            Cómodo
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default Density;
