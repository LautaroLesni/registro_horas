import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, esES } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { darken, lighten, styled } from "@mui/material/styles";

const StyledDataGrid = styled(DataGrid)(() => ({
  "& .super-app-theme--Open": {
    backgroundColor: "#aee6b1",
    "&:hover": {
      backgroundColor: "#c0fac4",
    },
    "&.Mui-selected": {
      backgroundColor: "#aee6b1",
      "&:hover": {
        backgroundColor: "#c0fac4",
      },
    },
  },
}));

export default function DataGridComponent({ columns, rows }) {
  return (
    <Box sx={{ height: "calc(100vh - 65px - 32px - 80px - 100px)" }}>
      <StyledDataGrid
        className="transition-all"
        sx={{ p: 2, backgroundColor: "#1e1e1e", borderRadius: "10px", height: "70%", width: "100%" }}
        rows={rows}
        columns={columns}
        slots={{ loadingOverlay: LinearProgress }}
        initialState={{
          sorting: {
            sortModel: [{ field: "tipo", sort: "asc" }],
          },
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSizeOptions={[50, 1]}
      />
    </Box>
  );
}
