import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import TextContent from "../../Component/TextContent";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ROUTES from "../../routes/ROUTES";
import normalizeRegister from "./normalizeRegister";
import { validateSchema } from "../../validation/registerationValidation";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
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
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [showRegister, setShowRegister] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

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

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", normalizeRegister(inputsValue, checked));
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
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.error("Registration failed:", err);
      setShowRegister(true);
    }
  };

  const isFieldRequired = (fieldName) => {
    return errors[fieldName] !== undefined;
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
        Sign up
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

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  onChange={(e) => handleCheck(e)}
                  checked={checked}
                />
              }
              label="Business Account"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Boolean(Object.keys(errors).length > 0)}
        >
          Sign Up
        </Button>
        {showRegister && <Alert severity="error">Failed To Register!</Alert>}{" "}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to={ROUTES.LOGIN}>Already have an account? Sign in</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;
