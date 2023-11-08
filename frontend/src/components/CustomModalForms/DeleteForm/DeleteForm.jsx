import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useClearModalState } from "../../../hooks/useClearModalState";
import { setStatusModal } from "../../../redux/slices/modal";

export default function DeleteFrom() {
  const { deleteFunction } = useSelector((state) => state.modal);

  const clearModalState = useClearModalState();

  const handleDelete = () => {
    deleteFunction();
    clearModalState();
  };

  const handleClose = () => {
    clearModalState();
  };
  return (
    <div>
      <div className="flex justify-center text-2xl mb-5">¿Seguro deseas eliminar?</div>
      <div className="flex justify-around">
        <div className="w-[45%]">
          <Button variant="outlined" fullWidth onClick={handleDelete}>
            SI
          </Button>
        </div>
        <div className="w-[45%]">
          <Button variant="outlined" fullWidth onClick={handleClose}>
            NO
          </Button>
        </div>
      </div>
    </div>
  );
}
