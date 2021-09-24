import { useState } from "react";
import validate from "../Components/validate";

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState({ });


  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {

    const validationErrors = validate(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      console.log("Authenticated", inputs);
    } else {
      console.log("errors try again", validationErrors);
    }
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    errors,
  };
};

export default useForm;
