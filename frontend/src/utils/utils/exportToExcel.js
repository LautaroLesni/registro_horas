import * as XLSX from "xlsx/xlsx.mjs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

export default function exportToExcel(data, columns, filename, condition) {
  let filteredColums = columns.filter((col) => col.headerName !== "Acciones");
  const worksheetData = data.map((row) => columns.map((column) => row[column.field]));
  let worksheet = [];

  if (condition === "withOutHeaders") {
    worksheet = XLSX.utils.aoa_to_sheet([...worksheetData]);
  } else {
    worksheet = XLSX.utils.aoa_to_sheet([filteredColums.map((column) => column.headerName), ...worksheetData]);
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, filename);

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const excelData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  saveAs(excelData, `${filename} ${dayjs().format("YYYY/MM/DD HH-mm-ss")}.xlsx`);
}
