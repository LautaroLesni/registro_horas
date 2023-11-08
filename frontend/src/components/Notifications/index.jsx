import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { clearNotification } from "../../redux/slices/notifications";
import { useSelector, useDispatch } from "react-redux";

const AlertMUI = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Variants = Error, Warning, Info, Success

const Notification = () => {
  const { open, message, status } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    dispatch(clearNotification());
  };

  return (
    open &&
    message.length &&
    status.length && (
      <Stack spacing={2}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(open)}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <AlertMUI onClose={handleClose} severity={status} sx={{ width: "100%", color: "white" }}>
            {message}
          </AlertMUI>
        </Snackbar>
      </Stack>
    )
  );
};

export default Notification;
