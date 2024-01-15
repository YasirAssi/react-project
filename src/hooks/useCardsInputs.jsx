import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import validateSchema from "../validation/cardValidation";
import LogInContext from "../store/loginContext";
import { fromServer } from "../services/normalizeRequest";
import axios from "axios";

const useCardsInputs = () => {
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
  let { id } = useParams();
  const { login } = useContext(LogInContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id || !login) {
      return;
    }

    try {
      const { data } = axios.get("/cards/" + id);
      if (data.user_id === login._id) {
        setInputsValue(fromServer(data));
      }
    } catch (err) {
      alert("failed");
    }
  }, [id, login]);

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

  const isRequiredField = (keyName) => {
    return errors[keyName] !== undefined;
  };

  return {
    id,
    inputsValue,
    setInputsValue,
    errors,
    navigate,
    keysArray,
    handleInputsChange,
    handleInputsBlur,
    isRequiredField,
  };
};

export default useCardsInputs;
