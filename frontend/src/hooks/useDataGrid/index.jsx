import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useState } from "react";

const useDataGrid = (dataColumns) => {
  const [formData, setFormData] = useState({ open: false });

  const handleEdit = (params) => {
    setFormData({ open: true, delete: false, data: params.row, editSetter: setFormData });
  };
  const handleDelete = (params) => {
    setFormData({ open: false, delete: true, data: params.row, editSetter: setFormData });
  };

  const columns = dataColumns.map((column) => {
    return {
      field: column.value,
      headerName: column.title,
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      flex: 1,
      minWidth: 150,
      ...(column.value === "id" && { maxWidth: 300, minWidth: 50 }),
      ...(column.value === "description" && {
        minWidth: 100,
      }),
      ...(column.value === "editar_eliminar" && { maxWidth: 600 } && {
          renderCell: (params) => {
            return (
              <div className="flex">
                <IconButton onClick={() => handleEdit(params)} id={params.id}>
                  <EditOutlinedIcon sx={{ pointerEvents: "none" }} />
                </IconButton>
                <IconButton onClick={() => handleDelete(params)} id={params.id}>
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          },
        }),
    };
  });

  return [columns, formData];
};

export default useDataGrid;
