import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import TextContent from "../Component/TextContent";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import useCardsInputs from "../hooks/useCardsInputs";
import { toServer } from "../services/normalizeToServer";

const EditCardPage = () => {
  const {
    id,
    inputsValue,
    setInputsValue,
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
      await axios.put(`cards/${id}`, toServer(inputsValue));
      toast.success(
        "Your card has been successfully edited. Check out your updated information!",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleDiscard = () => {
    setInputsValue((cInputsValue) => {
      const clearedInputs = Object.keys(cInputsValue).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      return clearedInputs;
    });
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
        <EditIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Edit your card
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
              autoFocus={keyName === "title"}
              required={isRequiredField(keyName)}
            />
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item lg={8} md={8} sm={8} xs>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={Boolean(Object.keys(errors).length > 0)}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              variant="contained"
              onClick={handleDiscard}
              color="secondary"
              sx={{
                mb: 2,
                mt: 2,
                width: "100%",
                ml: "0%",
              }}
            >
              Discard Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default EditCardPage;
