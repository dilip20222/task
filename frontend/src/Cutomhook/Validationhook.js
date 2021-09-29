import { useState } from "react";

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState({
    // username: "ronny123",
    // fullname : "raw ronny",
    // email : "roy@gmail.com",
    // date:"23/2/2001",
    // password : "123456",
    // confirmpassword : "123456",
    // phone :"123456789",
    // gender : "Male"
     });
  

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
