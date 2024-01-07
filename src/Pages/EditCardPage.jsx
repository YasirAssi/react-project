import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

const EditCardPage = () => {
  let { id } = useParams();
  return (
    <Typography variant="h1" color="initial">
      Edit Card Page {id}
    </Typography>
  );
};

export default EditCardPage;
