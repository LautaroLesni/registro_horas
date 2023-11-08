import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";

const initFn = () => alert("Required function handler");
const initialState = { edit: initFn, remove: initFn, visibility: initFn };

const EditOnly = ({ param, actionHandler = initialState }) => {
  return (
    <div>
      <IconButton onClick={() => actionHandler.edit(param)} size="small">
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const EditAndRemove = ({ param, actionHandler = initialState }) => {
  return (
    <div className="flex">
      <IconButton onClick={() => actionHandler.edit(param)} size="small">
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={() => actionHandler.remove(param)} size="small">
        <DeleteOutlineIcon sx={{ color: "#DC143C" }} fontSize="small" />
      </IconButton>
    </div>
  );
};

const EditRemoveVisualizate = ({ param, actionHandler = initialState }) => {
  return (
    <div className="flex">
      <IconButton onClick={() => actionHandler.visibility()} size="small">
        <VisibilityIcon sx={{ color: "green" }} fontSize="small" />
      </IconButton>
      <IconButton onClick={() => actionHandler.edit(param)} size="small">
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={() => actionHandler.remove(param)} size="small">
        <DeleteOutlineIcon sx={{ color: "#DC143C" }} fontSize="small" />
      </IconButton>
    </div>
  );
};

export { EditOnly, EditAndRemove, EditRemoveVisualizate };
