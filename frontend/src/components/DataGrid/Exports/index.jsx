import { CSVLink } from "react-csv";
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import { exportToExcel } from "../utils";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Exports = ({ data, columns, filename = "export" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClickExcel = () => {
    exportToExcel(data, columns, filename);
    handleClose();
  };

  return (
    <div className="sm:mb-4 mb-2 w-full md:w-auto">
      <Button
        size="small"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        fullWidth
        variant="outlined"
        sx={{ borderRadius: 50, minWidth: 125 }}
      >
        <div className="flex gap items-center gap-1">
          <GetAppRoundedIcon fontSize="small" />
          <div>Exportar</div>
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
        <MenuItem dense onClick={handleClickExcel}>
          Exportar Excel
        </MenuItem>
        <CSVLink
          filename={filename}
          separator=";"
          data={data}
          headers={columns.filter((col) => col.label !== "Acciones")}
        >
          <MenuItem dense>Exportar CSV</MenuItem>
        </CSVLink>
      </Menu>
    </div>
  );
};

export default Exports;
