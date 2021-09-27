import React, {  useState } from "react";
import useForm from "../../Cutomhook/Validationhook";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import validate from "../../Components/validate";
import CustomizedSnackbars from "../../Alert/SuccessSnackbar";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import SecurityIcon from '@mui/icons-material/Security';
import AddReactionTwoToneIcon from '@mui/icons-material/AddReactionTwoTone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorSnackbar from "../../Alert/Error";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SignIn = (props) => {

  const [open, setOpen] = React.useState(false);
  const [notification, setnotification] = React.useState(false);
  const { inputs, handleInputChange } = useForm({});
  const [errors, setErrors] = useState({});
  
  const handleClose = (reason, event) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setnotification(false);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    console.log("error", noErrors);
    setErrors(validationErrors);
    try {
      if (noErrors) {
        axios
        .post("http://localhost:3000/api/login", { ...inputs })
        .then((res) => {
          const {token} = res.data
          localStorage.setItem('token', token);
          console.log("User : ", res);
          console.log("Status :", res.status);
          setOpen(true)
        });
      }
      else
      {
        setnotification(true)
      }
    } 
    catch (error) {      
      console.log("Problem submitting New Post", errors);
      setnotification(true)
    }
    console.log(inputs);
  };
  
  return (
    
    <div
    className="form" style={{ borderRadius: "10px", background: "linear-gradient(#444 , #999 , #333)", width: "100%", height: "calc(100vh - 58px)", display: "flex", flexdirection: "column", alignitems: "center", justifyContent: "center" }}
    onSubmit={(e) => {
      handleSubmit(e);
    }}
    >
      <form className="row g-3 p-4" style={{ display: "flex", flexDirection: 'column', alignItems: "center", marginRight: "calc(var(--bs-gutter-x) * 0.5)", margintop: "30px", width: "50%" }}>
        <CustomizedSnackbars
          handlerclose={handleClose}
          open={open}
          setOpen={setOpen}
        />
        <ErrorSnackbar
          handlerclose={handleClose}
          notification={notification}
          setnotification={setnotification}
        />
        <hr />
        <h1 className="text-center">
          <AddReactionTwoToneIcon className="text-center icons mx-3" />
          Login - Form
        </h1>
        <hr />
        <div className="col-5">
          <label htmlFor="inputAddress" className="form-label">
            <MarkEmailReadIcon /> Email:
          </label>
          <input
            className="form-control"
            id="inputAddress"
            placeholder="Enter Your Email Address"
            type="email"
            name="email"
         
            value={inputs.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-5">
          <label htmlFor="inputZip" className="form-label">
            <SecurityIcon /> Password
          </label>
          <input
            placeholder="Enter Password "
            className="form-control"
            id="inputCity"
            type="password"
            name="password"
     
            value={inputs.password}
            onChange={handleInputChange}
          />
        </div>
        <div className=" my-5 text-center">
          <button className="btn btn-info"><CheckCircleIcon /> Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
