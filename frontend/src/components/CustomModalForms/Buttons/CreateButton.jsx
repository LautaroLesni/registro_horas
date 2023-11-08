// import Chip from "@mui/material/Chip";
// import { useDispatch } from "react-redux";
// import { setDataModal, setFormModal, setStatusModal, setStyleModal } from "../../../redux/slices/modal";

// export default function CreateButton({ descripcion = "Añadir", form, width = "400px", height = "auto" }) {
//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: width,
//     height: height,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 2,
//   };

//   const dispatch = useDispatch();

//   return (
//     <Chip
//       color="primary"
//       label={descripcion}
//       sx={{ mr: 3 }}
//       onClick={() => {
//         dispatch(setStatusModal(true));
//         dispatch(setFormModal(form));
//         dispatch(setStyleModal(style));
//       }}
//     />
//   );
// }

import { useDispatch } from "react-redux";
import { setDataModal, setFormModal, setStatusModal, setStyleModal } from "../../../redux/slices/modal";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Button } from "@mui/material";

export default function CreateButton({ descripcion = "Añadir", form, width = "400px", height = "auto" }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    height: height,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  const dispatch = useDispatch();

  return (
    <div className="mb-4 md:w-full">
      <Button
        fullWidth
        onClick={() => {
          dispatch(setStatusModal(true));
          dispatch(setFormModal(form));
          dispatch(setStyleModal(style));
        }}
        variant="outlined"
        sx={{ borderRadius: 50, minWidth: 145 }}
      >
        <div className="flex gap items-center gap-1">
          <AddCircleOutlineRoundedIcon fontSize="small" />
          <div>{descripcion}</div>
        </div>
      </Button>
    </div>
  );
}
