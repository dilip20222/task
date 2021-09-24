import React, { useState } from "react";
import "../SignIn/Sign.css";
import useForm from "../../Cutomhook/Validationhook";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MuiAlert from "@mui/material/Alert";
import CustomizedSnackbars from "../../Alert/SuccessSnackbar";
import ErrorSnackbar from "../../Alert/Error";
import validate from "../../Components/validate";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SignUp = (props) => {
  const { inputs, handleInputChange } = useForm({});
  const [open, setOpen] = useState(false);
  const [notification, setnotification] = useState(false);

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    const validationErrors = validate(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);

    if (noErrors) {
      axios
        .post("http://localhost:3000/api/register", { ...inputs })
        .then((res) => {
          const { token } = res.data;
          localStorage.setItem("token", token);
          console.log(token);
          setOpen(true);
        });
      console.log("Authenticated", inputs);
    } else {
      {
        setnotification(true);
        console.log(errors, "Not Found");
      }
      console.log("errors try again", validationErrors);
    }
    event.preventDefault();

    console.log(inputs);
  };

  const handleClose = (reason, event) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setnotification(false);
  };
  return (
    <>
      <div className="container">
        <h1>
          <AddCircleOutlineIcon className="icons"/>
          {props.title}
        </h1>
        <div
          className="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}

        >
          <form className="row g-3 p-5">
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

            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Username :-{" "}
              </label>
              <input
                className="form-control"
                id="inputEmail4"
                placeholder="Enter Your Username"
                type="text"
                name="username"
                id="username"
                value={inputs.username}
                onChange={handleInputChange}
              />
              
            </div>
            {/* {errors?.username && (
              <p style={{ color: "red" }}>{errors?.username}</p>
            )} */}
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                FullName
              </label>
              <input
                className="form-control"
                id="inputAddress"
                placeholder="Enter Your Fullname"
                type="text"
                name="fullname"
                id="fullname"
                value={inputs.fullname}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-3">
              <label htmlFor="inputAddress" className="form-label">
                Email:{" "}
              </label>
              <input
                className="form-control"
                id="inputAddress"
                placeholder="Enter Your Email"
                type="email"
                name="email"
                id="email"
                value={inputs.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-3">
              <label htmlFor="inputAddress2" className="form-label">
                Gender
              </label>
              <input
                className="form-control"
                id="inputAddress2"
                placeholder="Enter "
                type="text"
                name="gender"
                id="gender"
                value={inputs.gender}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputCity" className="form-label">
                date
              </label>
              <input
                className="form-control"
                id="inputCity"
                type="date"
                name="date"
                id="date"
                value={inputs.date}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-2">
              <label htmlFor="inputZip" className="form-label">
                Contact No. :-{" "}
              </label>
              <input
                className="form-control"
                max="10"
                min="10"
                id="inputCity"
                type="text"
                name="number"
                id="number"
                value={inputs.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="inputZip" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                id="inputCity"
                type="password"
                name="password"
                id="Password"
                value={inputs.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="inputZip" className="form-label">
                ConfirmPassword
              </label>
              <input
                className="form-control"
                id="inputCity"
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                value={inputs.confirmpassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <button className="btn btn-primary">Sign in</button>
            </div>
          </form>
        </div>
      </div>

      {/* 
        <div className="form" onSubmit={(e) => {
          handleSubmit(e);
        }}>

          <form >

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

            <div className="row justify-content-md-center">
              <div className="col-md-1">
                <label htmlFor="username">Username :- </label>
              </div>
              <div className="col-md-5">
              
              </div>
         
            {errors?.username && (
              <p style={{ color: "red" }}>{errors?.username}</p>
            )}
              <div className="col-md-1">
                <label htmlFor="fullname">FulName :- </label>
              </div>
              <div className="col-md-5">
              
  
            </div>
            {errors?.fullname && (
              <p style={{ color: "red" }}>{errors?.fullname}</p>
            )}
               </div>
               <div className="row">
            <div className="">
              <div className="col-md-1">
                <label htmlFor="email">Email :- </label>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={inputs.email}
                onChange={handleInputChange}
              />
            </div>
               <div className="form-group">
              <div className="gender">
                <label htmlFor="gender">Gender :- </label>
              </div>
              <input
                type="text"
                name="gender"
                id="gender"
                value={inputs.gender}
                onChange={handleInputChange}
              />
            </div>
            {errors?.gender && (
              <p style={{ color: "red" }}>{errors?.gender}</p>
            )}
            </div>
              <div className="form-group">
              <div className="date">
                <label htmlFor="date">Date :- </label>
              </div>
              <input
                type="date"
                name="date"
                id="date"
                value={inputs.date}
                onChange={handleInputChange}
              />
            </div>
            {errors?.date && (
              <p style={{ color: "red" }}>{errors?.date}</p>
            )}
            <div className="form-group">
              <div className="label">
                <label htmlFor="password">Password :</label>
              </div>
              <input
                type="password"
                name="password"
                id="Password"
                value={inputs.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <div className="label">
                <label htmlFor="confirmpassword">Confirm Password :</label>
              </div>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                value={inputs.confirmpassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="btns">
              <button className="button">Sign In</button>
            </div>
          </form>
        </div> */}
    </>
  );
};
