import React, { useEffect, useState } from "react";
import useForm from "../../Cutomhook/Validationhook";
import axios from "axios";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MuiAlert from "@mui/material/Alert";
import validate from "../../Components/validate";
import CustomizedSnackbars from "../../Alert/SuccessSnackbar";
import ErrorSnackbar from "../../Alert/Error";
import { Redirect, useHistory } from "react-router";
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
  
    if (noErrors === false) {
     axios
     .post("http://localhost:3000/api/login" , { ...inputs })
      .then((res) => {
        const {token} = res.data
        localStorage.setItem('token', token);
        console.log("token>>>>>",token)
        console.log("User : ", res);
          console.log("Status :", res.status);
          setOpen(true);
        });
      console.log("Authenticated", inputs);
    } 
  else {
      {
        console.log("Problem submitting New Post", errors);
      }
      setnotification(true);
      console.log("errors try again", validationErrors);
    }
    event.preventDefault();
    console.log(inputs);
  };

    return (


      
    <div className="conatiner">
      <h1>
        <VpnKeyIcon className="icons" />
        {props.title}
      </h1>

      <div
        className="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <form action="">
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
          <div className="form-group">
            <div className="label">
              <label htmlFor="email">Email : </label>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              value={inputs.email}
              onChange={handleInputChange}
            />
          </div>
          {errors?.email && <p style={{ color: "red" }}>{errors?.email}</p>}
          <div className="form-group">
            <div className="label">
              <label htmlFor="password">Password :</label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={inputs.password}
              onChange={handleInputChange}
            />
          </div>
          {errors?.password && (
            <p style={{ color: "red" }}>{errors?.password}</p>
          )}
          <div className="btns">
            <button className="button">Login In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
