import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ContactsIcon from "@mui/icons-material/Contacts";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import AddReactionTwoToneIcon from "@mui/icons-material/AddReactionTwoTone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getuserprofile } from "../../store/oneuser/profileAction";
import CustomizedSnackbars from "../../Alert/SuccessSnackbar";
import ErrorSnackbar from "../../Alert/Error";
import api from "../../utils/api";

const Update = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.profiles?.profile || {});
  const userprofile = useSelector((state)=>state?.profiles?.profile || null)
  console.log("++++++userprofile++++++++" , userprofile)
  const [selectedImage, setSelectedImage] = useState();
  const [Data, setData] = useState("");
  
  const [open, setOpen] = useState(false);
  const [ files , setFile ] = useState("")
  const [notification, setnotification] = useState(false);
  const token = localStorage.getItem("token");

 
  const handleClose = (reason, event) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setnotification(false);
  };

  useEffect(() => {
    setData(user)
  }, [user])

  const history = useHistory();
  
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", files);
    for (let key in Data) {
      formData.append(key, Data[key]);
    }


    try {
      api
        .put(`/update/profile/${Data._id}`,formData)
        .then((res) => {
          setData(res.data)
          dispatch(getuserprofile(res.data));
          setOpen(true);
        });
     
    } catch (msg) {
      console.log({ msg: "Not Updated" });
    }
  };

  const handleInput = (e) => {
    return setData({ ...Data, [e.target.name]: e.target.value });
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
                Data.file && `http://localhost:3000/uploads/${Data.file}`
              }
              alt=""
            />
            <h1 className="text-center">
              <AddReactionTwoToneIcon className="icons mx-3" />
              Update Profile
            </h1>
            <div className="btn">
              <button
                className="btn btn-success"
                onClick={() => {
                  history.push("/dashboard");
                }}
              >
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
                value={Data.username}
                onChange={handleInput}
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
                value={Data.fullname}
                onChange={handleInput}
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
                value={Data.email}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputZip" className="form-label">
                <ContactPhoneIcon /> Contact No.: -
              </label>
              <input
                className="form-control"
                placeholder="Enter Your Contact No."
                id="inputCity1"
                type="text"
                name="phone"
                value={Data.phone}
                onChange={handleInput}
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
