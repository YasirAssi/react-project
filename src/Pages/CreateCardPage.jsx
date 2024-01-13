import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";
import TextContent from "../Component/TextContent";
import { fromServer } from "./EditCardPage/normalizeRequest";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import useCardsInputs from "../hooks/useCardsInputs";

const CreateCardPage = () => {
  const {
    id,
    inputsValue,
    errors,
    navigate,
    keysArray,
    handleInputsChange,
    handleInputsBlur,
    isRequiredField,
  } = useCardsInputs();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/cards/", fromServer(inputsValue));
      navigate(ROUTES.CREATECARD);
    } catch (err) {
      console.log("error from axios", err);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <AutoAwesomeIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Creat Your Card
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextContent
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              type={keyName === "password" ? "password" : undefined}
              autoFocus={keyName === "title"}
              required={isRequiredField(keyName)}
            />
          ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default CreateCardPage;
