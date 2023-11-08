import DeleteFrom from "../components/CustomModalForms/DeleteForm/DeleteForm";
import { useDispatch } from "react-redux";
import { setDataModal, setDeleteModal, setFormModal, setStatusModal, setStyleModal } from "../redux/slices/modal";
export default function useHandler(form, style, handleDelete) {
  const dispatch = useDispatch();
  const styleDelete = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };
  const handler = {
    create: () => {
      dispatch(setStatusModal(true));
      dispatch(setFormModal(form));
      dispatch(setStyleModal(style));
    },
    edit: (params) => {
      dispatch(setStatusModal(true));
      dispatch(setDataModal(params));
      dispatch(setFormModal(form));
      dispatch(setStyleModal(style));
    },
    remove: (params) => {
      dispatch(setStatusModal(true));
      dispatch(setFormModal(<DeleteFrom />));
      dispatch(setStyleModal(styleDelete));
      dispatch(setDeleteModal(() => handleDelete(params.id)));
    },
  };
  return handler;
}
