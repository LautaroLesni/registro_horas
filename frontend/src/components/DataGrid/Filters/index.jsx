import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";

const Filters = ({ columns, setArr, arr }) => {
  const [activeFilters, setActiveFilters] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterCombination, setFilterCombination] = useState({
    column: "",
    filter: "",
    value: "",
  });

  useEffect(() => {
    const filtered = arr.filter((row) => {
      if (filterCombination.filter === "contains") {
        return (
          !filterCombination.value.length ||
          row[filterCombination.column]
            .toString()
            .toLowerCase()
            .includes(filterCombination.value.toString().toLowerCase())
        );
      } else if (filterCombination.filter === "equals") {
        return (
          !filterCombination.value ||
          row[filterCombination.column].toString().toLowerCase() === filterCombination.value.toString().toLowerCase()
        );
      } else {
        return row;
      }
    });

    if (filterCombination.value) {
      setActiveFilters(1);
    } else {
      setActiveFilters(0);
    }

    setArr(filtered);
  }, [filterCombination]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCombinationChange = (e) => {
    setFilterCombination((prev) => ({ ...prev, [e.target.name]: e.target.value || "" }));
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
          <PlayArrowRoundedIcon />
          <div>Filtros</div>
          <div className="ml-1 rounded-full bg-blue-100 text-sm px-2">{activeFilters}</div>
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
        <div className="p-1 px-2 min-w-[230px] flex flex-col">
          <TextField
            name="column"
            value={filterCombination.column}
            onChange={handleCombinationChange}
            label="Columna"
            sx={{ mb: 1 }}
            size="small"
            select
          >
            {columns?.map((col) => (
              <MenuItem name="column" key={col.key} value={col.key} dense divider>
                {col.label.length > 14 ? col.label.slice(0, 13) + ".." : col.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={filterCombination.filter}
            onChange={handleCombinationChange}
            name="filter"
            label="Filtro"
            sx={{ mb: 1 }}
            size="small"
            select
          >
            <MenuItem value="contains" dense divider>
              Contiene
            </MenuItem>
            <MenuItem value="equals" dense divider>
              Es igual
            </MenuItem>
          </TextField>
          <TextField
            value={filterCombination.value}
            name="value"
            sx={{ mb: 1 }}
            label="Valor"
            size="small"
            onChange={handleCombinationChange}
          />
          <Button
            onClick={() =>
              setFilterCombination({
                column: "",
                filter: "",
                value: "",
              })
            }
            fullWidth
            variant="outlined"
          >
            Limpiar Filtro
          </Button>
        </div>
      </Menu>
    </div>
  );
};

export default Filters;
