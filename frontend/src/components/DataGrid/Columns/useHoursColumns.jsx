import { useDispatch } from "react-redux";

export default function useHoursColumns() {
  const dispatch = useDispatch();

  const hoursColumns = [
    {
      key: "id",
      label: "ID",
      width: "w-16",
    },
    { key: "name", label: "Nombre" },
    {
      key: "action",
      label: "Acciones",
      action: "edit-remove",
      width: "w-20",
    },
  ];

  return { hoursColumns };
}
