import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";

const CreateForm = ({ form, openValue, setOpen, size = "400px" }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: size,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={openValue}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(5px)" } } }}
      >
        <Box sx={style}>{form}</Box>
      </Modal>
    </div>
  );
};

export default CreateForm;
