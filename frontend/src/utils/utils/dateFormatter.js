import dayjs from "dayjs";

const dateFormatter = (rawString, format = "DD/MM/YYYY") => {
  if (!rawString || !rawString.length) {
    return "S/F";
  }

  return dayjs(rawString?.split("T")[0]).format(format);
};

export default dateFormatter;
