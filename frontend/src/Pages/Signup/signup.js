import { useHistory } from 'react-router-dom'
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


import React, { useState } from "react";
import axios from "axios";
import useForm from "../../Cutomhook/Validationhook";
const Signup = (props) => {

  const [open, setOpen] = useState(false);
    const [notification, setnotification] = useState(false);
  const handleClose = (reason, event) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
        setnotification(false);
      };
    

  const [file, setFile] = useState("");
  const [input, setInput] = useState({ email: "" });
  const { inputs, handleInputChange } = useForm({});
  
  const history = useHistory()

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // const formData = new FormData();
      formData.append("username", inputs.username);
      formData.append("fullname", inputs.fullname);
      formData.append("email", inputs.email);
      formData.append("date", inputs.date);
      formData.append("gender", inputs.gender);
      formData.append("phone", inputs.phone);
      formData.append("confirmpassword", inputs.confirmpassword);
      formData.append("password", inputs.password);
      formData.append("file", file, file.name);

      let res = await axios.post(
        "http://localhost:3000/api/register",
        formData
      );
      const {token} = res.data
      localStorage.setItem('token' , token);
      
      if(token){
        history.push('/dashboard');
      }

      // {token ? history.push("/") : null}
      // token ? history.push('/SignIn') :'/Signup';
      setOpen(true);
      console.log("Response" , res)
      // handleClose();
    } catch (error) {
      setnotification(true);
      console.error(error);
    }
  };

  const head = {
    borderRadius: "10px",
    background: "linear-gradient(#444 , #999 , #333)", 
    width: "100%", 
    height: "calc(100vh - 58px)",
    display: "flex",
     flexdirection: "column", 
     alignitems: "center", 
     justifyContent: "center" 
 }

  return (
    <form onSubmit={onSubmit} className="p-4" style={head}>
      <div>
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
          <div className="row g-3 p-4">

       

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
<label htmlFor="file" className="form-label">Image : -</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="form-control"
          id="file"
          />
          </div>
          <div className="btn">
        <button className="btn btn-primary" onSubmit={onSubmit}>Sign Up</button>
          </div>
      </div>
      </div>
    </form>
  );
};

export default Signup;
