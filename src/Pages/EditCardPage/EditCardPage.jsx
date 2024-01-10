import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import TextContent from "../../Component/TextContent";
import validateSchema from "../../validation/cardValidation";
import LoginContext from "../../store/loginContext";
import { fromServer } from "./normalizeRequest";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import { toServer } from "../../services/normalizeResponse";

const EditCardPage = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  let { id: _id } = useParams();
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!_id || !login) {
      return;
    }
    axios
      .get("/cards/" + _id)
      .then(({ data }) => {
        if (data.user_id === login._id) {
          setInputsValue(fromServer(data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id, login]);

  let keysArray = Object.keys(inputsValue);

  const handleInputsChange = (e) => {
    setInputsValue((currentInputsValue) => ({
      ...currentInputsValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    const { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    if (error) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((currentErrors) => {
        delete currentErrors[e.target.id];
        return { ...currentErrors };
      });
    }
  };

  const isFieldRequired = (keyName) => {
    return errors[keyName] !== undefined;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/cards/" + _id, toServer(inputsValue));
      toast(
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
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response ? err.response : err);
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
              required={isFieldRequired(keyName)}
            />
          ))}
        </Grid>
      </Box>
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
  );
};
export default EditCardPage;
