import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const style = {
  position: "absolute",
  borderRadius: "15px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 3,
};

export default function DeleteModal({ handleDelete, data, type = "GRID", setterOpen }) {
  const [open, setOpen] = React.useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const genericDelete = async () => {
    setLoadingButton(true);
    const error = await handleDelete(type === "GRID" ? data.data.id : data.id);
    if (type === "GRID") {
      setterOpen({ ...data, delete: false });
    } else {
      setOpen(false);
    }
    setLoadingButton(false);
  };

  const handleClose = () => {
    if (type === "GRID") {
      setterOpen({ ...data, delete: false });
    } else {
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {type !== "GRID" && (
        <IconButton onClick={handleOpen}>
          <DeleteIcon />
        </IconButton>
      )}
      <Modal
        open={type === "GRID" ? data?.delete : open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(5px)" } } }}
      >
        <Box sx={style}>
          <div className="flex justify-between h-full flex-col items-center ">
            <div className="text-center">
              <div className="text-2xl tracking-wide font-semibold text-white">Eliminar</div>
              <div className="text-center mt-1 text-white">
                ¿Estas seguro que deseas eliminar a {type === "GRID" ? data?.data?.description : data.label}?
              </div>
            </div>
            <div className="w-full h-20">
              <Button sx={{ mb: 1, mt: 4, width: "100%" }} onClick={genericDelete} variant="outlined" fullWidth>
                {loadingButton ? <CircularProgress color="action" size={25} /> : "Eliminar"}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
