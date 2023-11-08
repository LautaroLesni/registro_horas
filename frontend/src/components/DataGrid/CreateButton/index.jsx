// import { useDispatch } from "react-redux";
// import { setDataModal, setFormModal, setStatusModal, setStyleModal } from "../../../redux/slices/modal";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Button from "@mui/material/Button";

export default function CreateButton({ descripcion = "Añadir", handler }) {
  return (
    <div className="mb-4 md:w-full">
      <Button size="small" onClick={handler} fullWidth variant="outlined" sx={{ borderRadius: 50, minWidth: 120 }}>
        <div className="flex gap items-center gap-1">
          <AddCircleOutlineRoundedIcon fontSize="small" />
          <div>{descripcion}</div>
        </div>
      </Button>
    </div>
  );
}
