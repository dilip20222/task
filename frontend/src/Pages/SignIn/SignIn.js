import React, {  useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import SecurityIcon from '@mui/icons-material/Security';
import AddReactionTwoToneIcon from '@mui/icons-material/AddReactionTwoTone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Nav } from "../../Components/Navbar/Nav";
import ErrorSnackbar from "../../Alert/Error";
import CustomizedSnackbars from "../../Alert/SuccessSnackbar";
import useForm from "../../hooks/Validationhook";
import validate from "../../hooks/validate";

const SignIn = (props) => {
  
  const [open, setOpen] = React.useState(false);
  const [notification, setnotification] = React.useState(false);
  const { inputs, handleInputChange } = useForm({});
  const [errors, setErrors] = useState({});
  const history = useHistory();

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
          const {token, role} = res.data;
          localStorage.setItem('token', JSON.stringify({token, role}));
          if(role === 'admin') {
            history.push('/admin/dashboard')
            return setOpen(true);
          }
          history.push('/dashboard') ;
          setOpen(true)
        });
      }
      setnotification(true)
    } 
    catch (error) {      
      console.log("Problem submitting New Post", errors);
      setnotification(true)
    }
    console.log(inputs);
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

  const formhead = {
     display: "flex",
      flexDirection: 'column',
       alignItems: "center",
        marginRight: "calc(var(--bs-gutter-x) * 0.5)", 
        margintop: "30px", 
        width: "50%" 
  }
  
  return (
    <>
    <Nav/>
    <div
    className="form" style={head}
    onSubmit={(e) => {
      handleSubmit(e);
    }}
    >
      <form className="row g-3 p-4" style={formhead}>
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
         required={true}
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
            required={true}
            value={inputs.password}
            onChange={handleInputChange}
          />
        </div>
        <div className=" my-5 text-center">
          <button className="btn btn-info"><CheckCircleIcon /> Sign In</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default SignIn;
