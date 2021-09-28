import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import useForm from "../../Cutomhook/Validationhook";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import CustomizedSnackbars from "../../Alert/SuccessSnackbar";
import ErrorSnackbar from "../../Alert/Error";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ContactsIcon from '@mui/icons-material/Contacts';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import SecurityIcon from '@mui/icons-material/Security';
import WcIcon from '@mui/icons-material/Wc';
import LockIcon from '@mui/icons-material/Lock';
import validate from "../../Components/validate";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AddReactionTwoToneIcon from '@mui/icons-material/AddReactionTwoTone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const SignUp = (props) => {
  const { inputs, handleInputChange } = useForm({});
  const [open, setOpen] = useState(false);
  const [notification, setnotification] = useState(false);

  const [errors, setErrors] = useState({});
 

  const handleSubmit = (event ,e) => {
    const validationErrors = validate(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    // let formData = new FormData();
    // Object.keys(e).forEach((inputs) => {
    //   console.log(inputs, e[inputs]);
    //   formData.append(inputs, e[inputs]);
    // });
    // const formData = new FormData();
    // Object.keys(event).forEach((fieldName) => {
    //   console.log(fieldName, event[fieldName]);
    //   formData.append(fieldName, event[fieldName]);
    // });
   //formdata object

    // formData.append(inputs, inputs);   //append the values with key, value pair
    // formData.append('email', 20);
    // formData.append('filess', inputs.files[0]);
  // console.log(inputs.filess)
    
    // const config = {     
    //     headers: { 'content-type': 'multipart/form-data' }
    // }
    
    // const options = {
    //   method: 'POST',
    //   body: formData,
    // };


   

    if (noErrors) {

     let formData = new FormData();
       // const formData = new FormData();
       formData.append('username', inputs.username);
       formData.append('fullname', inputs.fullname);
       formData.append('email', inputs.email);
    formData.append('date', inputs.date);
    formData.append('gender', inputs.gender);
    formData.append('phone', inputs.phone);
    formData.append('confirmpassword', inputs.confirmpassword);
    formData.append('password', inputs.password);
    formData.append('filess', inputs.filess);
    // console.log({ formData });
    // Object.keys(e).forEach((inputs) => {
    //   console.log(inputs, e[inputs]);
    //   formData.append(inputs, e[inputs]);
    // });
      axios
        .post("http://localhost:3000/api/register",formData,{...inputs})
        .then((res) => {
          const { token } = res.data;
          localStorage.setItem("token", token);
          console.log(token);
          setOpen(true);
        });
      console.log("Authenticated", inputs);
    } 
    else {
      setnotification(true);
      {
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

  const head = {
        borderRadius: "10px",
        background: "linear-gradient(#444 , White , #333)",
         width: "100%" 
  }

  
  return (
    <>
      <div
        className="form" style={head}
    
    onSubmit={handleSubmit}
        // onSubmit={(e) => {
        //   handleSubmit(e);
        // }}

      >
        <form encType="multipart/form-data" className="row g-4 p-5" style={{ marginRight: "calc(var(--bs-gutter-x) * 0.5)"  }}>
          <hr />
          <h1 className='text-center'>
            <AddReactionTwoToneIcon className="icons mx-3" />
            Registration - Form
          </h1>
          <hr />
          <CustomizedSnackbars
            handlerclose={handleClose}
            open={open}
            setOpen={setOpen}
          />
          <h4>
            <NewReleasesIcon /> Username , Fullname  , Contact , Email and Password is mandatory to fill !
          </h4>

          <ErrorSnackbar
            handlerclose={handleClose}
            notification={notification}
            setnotification={setnotification}
          />

          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              <PersonAddIcon /> Username :-
            </label>
            <input
              className="form-control"
              id="inputEmail4"
              placeholder="Enter Your Username"
              type="text"
              name="username"

              value={inputs.username}
              onChange={handleInputChange}
            />

          </div>
          {/* {errors?.username && (
              <p style={{ color: "red" }}>{errors?.username}</p>
            )} */}
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              <ContactsIcon /> FullName :-
            </label>
            <input
              className="form-control"
              id="inputAddress"

              placeholder="Enter Your Fullname"
              type="text"
              name="fullname"
              value={inputs.fullname}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-3">
            <label htmlFor="inputAddress" className="form-label">
              <MarkEmailReadIcon /> Email :-
            </label>
            <input
              className="form-control"
              id="inputAddress1"
              placeholder="Enter Your Email"
              type="email"
              name="email"

              value={inputs.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-3">
            <label htmlFor="inputAddress2" className="form-label">
              <WcIcon /> Gender :-
            </label>
            <input
              className="form-control"
              id="inputAddress2"
              placeholder="Enter Your Gender"
              type="text"
              name="gender"

              value={inputs.gender}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputCity" className="form-label">
              <EventAvailableIcon /> Date :-
            </label>
            <input
              className="form-control"
              id="inputCity2"
              type="date"
              name="date"

              value={inputs.date}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputZip" className="form-label">
              <ContactPhoneIcon /> Contact No.: -
            </label>
            <input
              className="form-control"
              placeholder="Enter Your Contact No."
              max="10"
              min="10"
              id="inputCity1"
              type="text"
              name="phone"

              value={inputs.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputZip" className="form-label">
              <SecurityIcon /> Password :-
            </label>
            <input
              placeholder="Enter Password"
              className="form-control"
              id="inputCity4"
              type="password"
              name="password"

              value={inputs.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputZip" className="form-label">
              <LockIcon />  confirmpassword :-
            </label>
            <input
              className="form-control"
              id="inputCity5"
              type="password"
              name="confirmpassword"
              value={inputs.confirmpassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="filess" className="form-label">
              <LockIcon />Image :-
            </label>
            <input
              className="form-control"
              id="filess"
              type="file"
              name="filess"
              value={inputs.filess}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-center my-5">
            <button className="btn btn-success"><CheckCircleIcon />Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
};
