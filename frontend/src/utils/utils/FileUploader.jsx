import { useRef } from "react";
import UploadIcon from "@mui/icons-material/Upload";

const FileUploader = ({ handler, to, value, keyword, expense = false, size = "56px" }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  return (
    <>
      <button
        className={`${
          value[keyword] ? "border-[#3bbd6d] text-[#3bbd6d]" : "border-[#bdbdbd] text-gray-500"
        } h-[${size}] border-[1px]  hover:border-[#3b79bd] hover:text-[#3b79bd] rounded w-full flex items-center justify-between px-3 transition-all ${
          expense && "py-[5.5px]"
        }`}
        onClick={handleClick}
      >
        Subir {to}
        <UploadIcon />
      </button>
      <input type="file" ref={hiddenFileInput} onChange={handler} style={{ display: "none" }} />
    </>
  );
};
export default FileUploader;
