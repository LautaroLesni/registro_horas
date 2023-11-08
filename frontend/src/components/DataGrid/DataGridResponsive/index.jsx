import Tooltip from "@mui/material/Tooltip";
import TablePagination from "@mui/material/TablePagination";
import CreateButton from "../CreateButton";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { getFormattedRows } from "../utils";
import { EditAndRemove, EditOnly, EditRemoveVisualizate } from "../Actions";
import Exports from "../Exports";
import Filters from "../Filters";
import Density from "../Density";
import dayjs from "dayjs";

const DataGridResponsive = ({
  pageSize = 25,
  rows = [],
  columns = [{ key: "", label: "" }],
  loading = false,
  saveRawData = false,
  actionHandler,
  createButton = true,
  toolBar = true,
}) => {
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(0);
  const [density, setDensity] = useState({ row: "p-2", column: "px-2" });
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const defaultActions = {
    edit: EditOnly,
    "edit-remove": EditAndRemove,
    "edit-remove-visibility": EditRemoveVisualizate,
  };

  const formattedRows = getFormattedRows({ rows, columns, saveRawData });

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setArr(formattedRows);
  }, [rows]);

  return (
    <div className="w-full pt-3 px-0 md:px-3 font-roboto rounded-lg md:shadow-md">
      <div className="w-full ">
        <div className="w-full sm:flex justify-between items-center">
          {toolBar && (
            <div className="sm:flex gap-2">
              <Filters arr={formattedRows} setArr={setArr} columns={columns} />
              <div className="flex gap-2">
                <Exports data={formattedRows} columns={columns} />
                <Density setDensity={setDensity} />
              </div>
            </div>
          )}
          <div>{createButton && <CreateButton handler={actionHandler.create} />}</div>
        </div>
        <div className={`md:flex ${density.column} transition-all hidden`}>
          {columns.map(({ key, label, width }) => (
            <div
              key={key}
              className={`uppercase font-bold text-xs ${width ? width : "flex-1"}`}
              style={{ width: width }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className={`w-full mt-4 datagrid-scroll h-[500px] max-h-[500px] min-h-[500px]`}>
        {!loading && arr.length ? (
          arr
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .sort((a, b) => a?.id - b?.id)
            .map((row, index) => {
              const action = columns.find((column) => column.key === "action")?.action;
              const RenderAction = defaultActions[action];
              let width = window.innerWidth;
              let maxLength = width <= 768 ? 20 : 25;

              return (
                <div
                  key={index}
                  className={`mb-1 ${density.row} transition-all rounded bg-neutral-100/50 border-l-[#3b79bd] border-l-[4px] text-sm border-white md:flex items-center relative`}
                >
                  {columns.map((col) => {
                    const key = col.key;
                    const colData = row[key];

                    if (colData !== undefined) {
                      const cellContent = col.renderCell ? (
                        col.renderCell(row)
                      ) : (
                        <div key={key} className={`${col.width ? col.width : "flex-1"} text-gray-600`}>
                          <Tooltip title={colData || "S/D"}>
                            <div className="w-max flex items-center">
                              <div className="md:hidden mr-2 uppercase font-semibold text-xs text-gray-800 ">
                                {col.label}:
                              </div>
                              {colData?.length && col.key.includes("date")
                                ? dayjs(colData).add(1, "day").format("DD/MM/YYYY")
                                : col.key.includes("salary")
                                ? `$${colData}`
                                : colData?.length > maxLength
                                ? colData.slice(0, maxLength - 2) + ".."
                                : colData || "S/D"}
                            </div>
                          </Tooltip>
                        </div>
                      );
                      return (
                        <div key={key} className={`${col.width ? col.width : "flex-1"} text-gray-600`}>
                          {cellContent}
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="w-20 flex justify-center absolute md:static top-3 right-0">
                    {<RenderAction param={row} actionHandler={actionHandler} /> || "S/D"}
                  </div>
                </div>
              );
            })
        ) : !loading && !arr.length ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="uppercase text-xs text-gray-500 font-bold">No hay datos para mostrar.</div>
          </div>
        ) : (
          <div>
            {Array(pageSize)
              .fill()
              .map((_, index) => (
                <div key={index} className="mb-1 w-full">
                  <div className="hidden md:block">
                    <Skeleton variant="rounded" width={"100%"} height={46} />
                  </div>
                  <div className="md:hidden">
                    <Skeleton variant="rounded" width={"100%"} height={116} />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="flex w-full justify-end ">
        <TablePagination
          count={rows.length}
          page={page}
          component="div"
          sx={{ borderBottom: "none", padding: 0 }}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          size="small"
          labelRowsPerPage=""
        />
      </div>
    </div>
  );
};

export default DataGridResponsive;
