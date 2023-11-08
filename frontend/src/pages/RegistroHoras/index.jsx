import BreadCrumb from "../../components/BreadCrumb";
import PositionsForm from "../../components/CustomModalForms/Forms/PositionsForm";
import useHoursColumns from "../../components/DataGrid/Columns/useHoursColumns";
import MenuAppBar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGridResponsive from "../../components/DataGrid";
import useHandler from "../../hooks/useHandler";

export default function RegistroHoras() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  /*   const { positions } = useSelector((state) => state.positions); */
  const { hoursColumns } = useHoursColumns();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "250px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  /*  useEffect(() => {
    dispatch(getAllPositions()).then(() => setLoading(false));
  }, []); */

  const handleDelete = (id) => {
    dispatch(deletePositions(id));
  };

  const handler = useHandler(<PositionsForm />, style, handleDelete);

  return (
    <div className="w-[100vw] h-auto min-h-[100vh] bg-[#2d3250] items-center">
      <MenuAppBar />
      <div className="flex justify-between items-center bg-[#161928]">
        <div className="mb-3  pt-2 px-5 rounded flex flex-col ">
          <h1 className="font-semibold  text-2xl text-white">Registro de horas</h1>
          <BreadCrumb origin={"Horas"} current={"Registro de horas"} />
        </div>
      </div>
      <div>
        <DataGridResponsive rows={[]} loading={loading} columns={hoursColumns} actionHandler={handler} />
      </div>
    </div>
  );
}
