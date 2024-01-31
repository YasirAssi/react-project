import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Avatar, Button, Grid, Box, Typography, Alert } from "@mui/material";
import TextContent from "../Component/TextContent";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ROUTES from "../routes/ROUTES";
import normalizeRegister from "./RegisterPage/normalizeRegister";
import { validateSchema } from "../validation/registerationValidation";
import { toast } from "react-toastify";

const EditUserPage = () => {
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    phone: "",
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
    first: "",
    last: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [showUserEdit, setShowUserEdit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  let keysArray = Object.keys(inputsValue);

  const handleInputsChange = (e) => {
    setInputsValue((CopyOfCurrentValue) => ({
      ...CopyOfCurrentValue,
      [e.target.id]: e.target.value,
    }));
  };
  const handleInputsBlur = (e) => {
    let dataFromJoi = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    if (dataFromJoi.error) {
      setErrors((copyOfErrors) => ({
        ...copyOfErrors,
        [e.target.id]: dataFromJoi.error.details[0].message,
      }));
    } else {
      setErrors((copyOfErrors) => {
        delete copyOfErrors[e.target.id];
        return { ...copyOfErrors };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`users/${id}`, normalizeRegister(inputsValue));
      toast.success("Registered Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.PROFILE);
    } catch (err) {
      setShowUserEdit(true);
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

  const isFieldRequired = (fieldName) => {
    return errors[fieldName] !== undefined;
  };

  const handleDiscard = () => {
    setInputsValue((copyInputsValue) => {
      const clearedInputs = Object.keys(copyInputsValue).reduce((acc, key) => {
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
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Edit User
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
              autoFocus={keyName === "first"}
              required={isFieldRequired(keyName)}
            />
          ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Boolean(Object.keys(errors).length > 0)}
        >
          Submit
        </Button>
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
        {showUserEdit && <Alert severity="error">Failed To Edit!</Alert>}{" "}
      </Box>
    </Box>
  );
};

export default EditUserPage;
