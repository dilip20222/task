import { useState } from "react";

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState({});
  

  const [errors, setErrors] = useState({});
  const [image , setImage] = useState("");

  const handleInputChange = (event) => {
    const { type } = event.target;
    event.persist();
    if(type == "file" )
    {
      setImage(event.target.files[0])
    }
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    // handleSubmit,
    handleInputChange,
    inputs,
    setInputs,
    errors
  };
};

export default useForm;
