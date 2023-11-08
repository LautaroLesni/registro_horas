import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDataModal, setDeleteModal, setFormModal, setStatusModal, setStyleModal } from "../redux/slices/modal";

export function useClearModalState() {
  const dispatch = useDispatch();

  const clearModalState = () => {
    dispatch(setStatusModal(false));
    dispatch(setFormModal([]));
    dispatch(setStyleModal({}));
    dispatch(setDataModal([]));
    dispatch(setDeleteModal([]));
  };

  return clearModalState;
}
