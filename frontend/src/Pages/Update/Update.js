import { useHistory } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import CustomizedSnackbars from "../../Alert/SuccessSnackbar";
import ErrorSnackbar from "../../Alert/Error";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ContactsIcon from "@mui/icons-material/Contacts";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import SecurityIcon from "@mui/icons-material/Security";
import WcIcon from "@mui/icons-material/Wc";
import LockIcon from "@mui/icons-material/Lock";
import validate from "../../Cutomhook/validate";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import AddReactionTwoToneIcon from "@mui/icons-material/AddReactionTwoTone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import React, { useState } from "react";
import axios from "axios";
import useForm from "../../Cutomhook/Validationhook";
import { Nav } from "../../Components/Navbar/Nav";
import Navbar from "../../Components/Navbar/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { addprofile } from "../../store/store";
// import profileApp,{addprofile} from "";
const Update = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.profiles?.profile || {});
  const [profile, setProfile] = useState({})
  
  React.useEffect(() => {
    setProfile(user);
  }, [user]);

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
  // const { inputs, onchange } = useForm({});

  const history = useHistory();
  let [responseData, setResponseData] = React.useState({});
  const token = localStorage.getItem("token");
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      // We need to pass the data for the update About which data we have to update
      axios
        .put(
          `http://localhost:3000/api/update/${profile._id}`,
          profile,
          { headers: { tokens: `${token}` } }
        )
        .then((res) => {
          dispatch(addprofile(res.data))
          history.push("/users");
        });
    } catch (msg) {
      console.log({ msg: "Not Updated" });
    }
  };

  const onchange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
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
  return (
    <>
      <form onSubmit={onSubmit} className="p-4" style={head}>
        <div>
          <div
            className="user"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <img
              style={{ width: "120px", borderRadius: "15px" }}
              src={
                profile.file && `http://localhost:3000/uploads/${profile.file}`
              }
              alt=""
            />
            <h1 className="text-center">
              <AddReactionTwoToneIcon className="icons mx-3" />
              Update Profile
            </h1>
            <div className="btn">
              <button className="btn btn-success" onClick={()=>{history.push('/dashboard')}}>
                <ArrowBackIcon /> Back
              </button>
            </div>
          </div>
          <hr />
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
                value={profile.username}
                onChange={onchange}
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
                value={profile.fullname}
                onChange={onchange}
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
                value={profile.email}
                onChange={onchange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputZip" className="form-label">
                <ContactPhoneIcon /> Contact No.: -
              </label>
              <input
                className="form-control"
                placeholder="Enter Your Contact No."
                //   max="10"
                //   min="10"
                id="inputCity1"
                type="text"
                name="phone"
                value={profile.phone}
                onChange={onchange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="file" className="form-label">
                Image : -
              </label>
              <input
                type="file"
                value={
                  setProfile.file &&
                  `http://localhost:3000/uploads/${responseData.file}`
                }
                onChange={(e) => setFile(e.target.files[0])}
                className="form-control"
                id="file"
              />
            </div>
            <div className="btn">
              <button className="btn btn-success" onSubmit={onSubmit}>
                <CheckCircleIcon /> Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Update;
