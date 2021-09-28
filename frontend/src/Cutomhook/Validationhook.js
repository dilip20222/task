import { useState } from "react";

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState({
    username: "ronny123",
    fullname : "raw ronny",
    email : "roy@gmail.com",
    date:"23/2/2001",
    password : "123456",
    confirmpassword : "123456",
    phone :"123456789",
    gender : "Male"
     });
  

  const [errors, setErrors] = useState({});
  const [image , setImage] = useState("");

  // const handleSubmit = (event) => {

  //   const validationErrors = validate(inputs);
  //   const noErrors = Object.keys(validationErrors).length === 0;
  //   setErrors(validationErrors);
  //   if (noErrors ) {
  //     console.log("Authenticated", inputs);
      
  //   } else {
  //     console.log("errors try again", validationErrors);
  //   }
  //   event.preventDefault();
  // };

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
//  const handleInputChange = (e) => {
//    console.log("files>>>",e.target.name)
//     switch (e.target.name) {
//       case 'filess':
//         setInputs({ filess: e.target.files[0] });
//         break;
//       default:
//         setInputs({ [e.target.name]: e.target.value });
//     }
//   }


  // const handleInputChange = (event) => {
  //   event.persist();
  //   console.log("events>>.",event.target.name)
  //   switch (event.target.name) {
  //     case 'filess':
    
  //       setInputs((inputs) => ({
  //          //...inputs,
  //        filess:event?.target?.filess[0],
  //       }));
  //     // setInputs({...inputs, filess: event.target.files[0] });
  //       break;
  //     default:
  //       setInputs((inputs) => ({
  //         ...inputs,
  //         [event.target.name]: event.target.value,
  //       }));
  //       // this.setState({ [e.target.name]: e.target.value });
  //   }
  // }

  return {
    // handleSubmit,
    handleInputChange,
    inputs,
    setInputs,
    errors
  };
};

export default useForm;
