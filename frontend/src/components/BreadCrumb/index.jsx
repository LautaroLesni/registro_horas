import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

export const BreadCrumb = ({ origin, current }) => {
  return (
    <div>
      <Breadcrumbs>
        <Typography color="inherit">{origin}</Typography>
        <Typography color="text.primary">{current}</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumb;
