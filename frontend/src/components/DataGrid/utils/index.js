import * as XLSX from "xlsx/xlsx.mjs";
import dayjs from "dayjs";

function getNestedProperty(obj, route) {
  return route.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

export function getFormattedRows({ rows, columns, saveRawData }) {
  return rows.map((row) => {
    const formattedRow = { ...row };
    columns.forEach((column) => {
      if (column.route) {
        const nestedValue = getNestedProperty(row, column.route);
        if (saveRawData) {
          formattedRow[column.key + "Raw"] = formattedRow[column.key];
        }
        formattedRow[column.key] = nestedValue !== null ? nestedValue : "N/A";
      }
    });
    return formattedRow;
  });
}

export function exportToExcel(data, columns, filename) {
  let filteredColums = columns.filter((col) => col.label !== "Acciones");
  const worksheetData = data.map((row) => columns.map((column) => row[column.key]));

  const worksheet = XLSX.utils.aoa_to_sheet([filteredColums.map((column) => column.label), ...worksheetData]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, filename);

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const excelData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  saveAs(excelData, `${filename} ${dayjs().format("YYYY/MM/DD HH-mm-ss")}.xlsx`);
}