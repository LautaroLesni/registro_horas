import axiosInstance from "./axiosInstance";
import { isAxiosError } from "axios";

const signUser = async (data) => {
  try {
    const response = await axiosInstance.post("/login", data);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      //console.log(error);
      return { error: true, message: error.response.data.error || "Ocurrio un error inesperado" };
    } else {
      return { error: true, message: error.message };
    }
  }
};

export default signUser;
