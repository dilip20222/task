import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ContactsIcon from "@mui/icons-material/Contacts";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import AddReactionTwoToneIcon from "@mui/icons-material/AddReactionTwoTone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ErrorSnackbar from "../../Alert/Error";
import Successbar from "../../Alert/SuccessSnackbar";
import { Nav } from "../../Components/Navbar/Nav";
import useForm from "../../hooks/Validationhook";

const AddUser = (props) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

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

  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file, file.name);
    for(let key in inputs) {
      formData.append(key, inputs[key]);
    }
    axios
      .post("http://localhost:3000/api/register", formData)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);

        if (token) {
          history.push("/dashboard");
        }

        setOpen(true);
        console.log("Response", res);
      })
      .catch();
    {
      console.log("Not valid Inputs");
    }
    return formData;
  };

  const head = {
    background: "linear-gradient(#444 , #999 , #333)",
    width: "100%",
    height: "calc(100vh - 58px)",
    display: "flex",
    flexdirection: "column",
    alignitems: "center",
    justifyContent: "center",
  };

  console.log(inputs);

  return (
    <>
      <form onSubmit={onSubmit} className="p-4" style={head}>
        <div>
          <h1 className="text-center">
            <AddReactionTwoToneIcon className="icons mx-3" />
            Add User
          </h1>
          <hr />
          <Successbar
            handlerclose={handleClose}
            open={open}
            setOpen={setOpen}
          />
          <h4>
            <NewReleasesIcon /> Username , Fullname , Contact , Email and
            Password is mandatory to fill !
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
                required={true}
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
                required={true}
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
                required={true}
              />
            </div>
            <div className="col-3">
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender : -</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  value={inputs.gender}
                  onChange={handleInputChange}
                  name="gender"
                >
                  <FormControlLabel
                    name="gender"
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    name="gender"
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
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
                maxLength={10}
                id="inputCity1"
                type="number"
                name="phone"
                value={inputs.phone}
                onChange={handleInputChange}
                required={true}
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
                required={true}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputZip" className="form-label">
                <LockIcon /> confirmpassword :-
              </label>
              <input
                className="form-control"
                id="inputCity5"
                type="password"
                name="confirmpassword"
                value={inputs.confirmpassword}
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="file" className="form-label">
                Image : -
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="form-control"
                id="file"
                // required={true}
              />
            </div>
            <div className="btn">
              <button className="btn btn-primary" onSubmit={onSubmit}>
                <CheckCircleIcon /> Add User
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddUser;
