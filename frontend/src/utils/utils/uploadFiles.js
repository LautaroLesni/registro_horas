import axiosInstance from "./axiosInstance";
import axios from "axios";
import { setNotification } from "../redux/slices/notification";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const uploadFiles = async (filetype, files) => {
  switch (filetype) {
    case "docs":
      try {
        let formData = new FormData();
        if (files.length === 1) {
          formData.append("file", files[0]);
          const upload = await axiosInstance.post(`/upload`, formData, config);
          const fileToUpload = { name: upload.data, type: files[0].type };
          return { status: 200, data: fileToUpload };
          /* return {status:200, message:'Documento subido con exito'} */
        } else if (files.length > 1) {
          files.forEach((file, index) => {
            formData.append("files", file);
          });
          const upload = await axiosInstance.post(`/upload/multiple`, formData, config);
          const uploadedFiles = upload.data.map((file) => {
            return { name: file.filename, type: file.mimetype, fecha: new Date() };
          });
          return { status: 200, data: uploadedFiles };
        }
      } catch (error) {
        //console.log(error);
        return { status: 400, message: error.response.data };
      }
    case "images":
      try {
        const formData = new FormData();
        formData.append("image", files);
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/images`, formData);
        const fileToUpload = { name: res.data, type: files.type };
        return { status: 200, data: fileToUpload };
      } catch (error) {
        //console.log(error);
        return { status: 400, message: error.response.data };
      }
  }
};

export default uploadFiles;
