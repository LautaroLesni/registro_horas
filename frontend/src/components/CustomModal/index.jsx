import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataModal, setFormModal, setStatusModal } from "../../redux/slices/modal";

export default function CustomModal() {
  const { status, form, style } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setStatusModal(false));
    dispatch(setDataModal([]));
    dispatch(setFormModal([]));
  };

  useEffect(() => {
    if (status === true) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [status]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(5px)" } } }}
      >
        <Box sx={style}>{form || <div>No hay form</div>}</Box>
      </Modal>
    </div>
  );
}
