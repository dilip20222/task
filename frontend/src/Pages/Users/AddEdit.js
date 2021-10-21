import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ContactsIcon from "@mui/icons-material/Contacts";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import AddReactionTwoToneIcon from "@mui/icons-material/AddReactionTwoTone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import api from "../../utils/api";
import { alluser } from "../../store/Users/AlluserAction";
import Successbar from "../../Alert/SuccessSnackbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddEdit = (props) => {
  const isUpdate = !!props.match.params.id;

  const paramsId = props.match.params.id;
  const [Data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [file, setfile] = useState("");

  const users = useSelector((state) => state.alluser?.alluser || null);
  console.log("_____________+++++DATA+______", users);
  const dispatch = useDispatch();
  const history = useHistory();

  const { _id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Data);
    return isUpdate ? updateUser(Data) : createUser(Data);
  };

  React.useEffect(() => {
    api
      .get(`/edituser/${paramsId}`)
      .then((res) => {
        setData(res.data);
        console.log("RESPONSSSSSSSSSSSSSEEE", res.data);
      })
      .catch((error) => {
        console.log({ error: "Data Not Found" });
      });
  }, []);

  const handleInput = (e) => {
    return setData({ ...Data, [e.target.name]: e.target.value });
  };

  const updateUser = (e) => {
    const formData = new FormData();
    formData.append("file", file);
    for (let key in Data) {
      formData.append(key, Data[key]);
    }
    try {
      axios
        .put(`http://localhost:3000/api/update/${paramsId}`, formData)
        .then((res) => {
          setData(res.data);
          dispatch(alluser(res.data));
          setOpen(true);
        });
     
    } catch (msg) {
      console.log({ msg: "Not Updated" });
    }
    return formData;
  };

  const createUser = () => {
    // axios.post('http://localhost:3000/api/register').then((res)=>{
    //     console.log("New USer     =========== respoes" , res.data)
    // }).catch((error)=>console.log({error : "Not Valid Input"}))
  };

 

  const handleClose = (e) => {
    setOpen(false);
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
      <form onSubmit={handleSubmit} style={head}>
        <div>
          <Successbar
            handlerclose={handleClose}
            open={open}
            setOpen={setOpen}
          />
          <div
            className="user"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <h1 className="text-center my-2">
              <img
                src={`http://localhost:3000/uploads/${Data.file}`}
                style={{
                  width: "150px",
                  borderRadius: "40px",
                  objectFit: "cover",
                }}
                alt=""
              />
              <AddReactionTwoToneIcon className="icons mx-3" />
              Update Profile
            </h1>
            <div className="btn">
              <button
                className="btn btn-success"
                onClick={() => {
                  history.push("/users");
                }}
              >
                <ArrowBackIcon /> Back
              </button>
            </div>
          </div>
          <hr />
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
                //   max="10"
                //   min="10"
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
                onChange={(e) => setfile(e.target.files[0])}
                className="form-control"
                id="file"
                // required={true}
              />
            </div>
            {/* <div className="col-md-3">
              <label htmlFor="inputZip" className="form-label">
                <ContactPhoneIcon /> Image :-
              </label>
              <input
                className="form-control"
                id="inputCity1"
                type='file'
                name="phone"
                value={Data.file}
                onChange={(newimage)=>{return newimage}}
              />
            </div> */}
            <div className="btn">
              <button className="btn btn-success" onSubmit={handleSubmit}>
                <CheckCircleIcon /> Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddEdit;
