import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";
import TextContent from "../Component/TextContent";
import validateSchema from "../validation/cardValidation";
import LoginContext from "../store/loginContext";
import { fromServer } from "./EditCardPage/normalizeRequest";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const CreateCardPage = () => {
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
    if (_id || !login) {
      return;
    }
    axios
      .get("/cards/")
      .then(({ data }) => {
        if (data.user_id === login._id) {
          setInputsValue(fromServer(data));
        } else {
          toast("You need to SignIn", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate(ROUTES.LOGIN);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id, login, navigate]);

  let keysArray = Object.keys(inputsValue);
  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    const { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    console.log({ error });
    if (error) {
      setErrors((cErrors) => ({
        ...cErrors,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((cErrors) => {
        delete cErrors[e.target.id];
        return { ...cErrors };
      });
    }
  };

  const isFieldRequired = (inputName) => {
    return errors[inputName] !== undefined;
  };

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
              required={isFieldRequired(keyName)}
            />
          ))}
        </Grid>
      </Box>
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
  );
};
export default CreateCardPage;
