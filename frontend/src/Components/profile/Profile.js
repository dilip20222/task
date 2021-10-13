import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import axios from "axios";
import { addprofile } from "../../store/store";
import store from '../../store/store';

export const Profile = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.profiles.profile);
  console.log("Profile Data>>>>>>>>>>", responseData);
  
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/", {headers: { tokens: `${token}`}})
      .then((res) => {
        dispatch(addprofile(res.data));
      });
  }, []);

  const image = {
    width: "100px",
    borderRadius: "15px",
    objectFit: "cover",
  };

  const card = {
    background: "linear-gradient(#444 , #999 , #333)",
    borderRadius: "10px",
    color: "#d4de48",
  };

  const details = {
    color: "white",
  };

  return (
    <>
    <div className="conatiner" style={card}>
      <div className="maincard p-4">
        <h3>User Profile</h3>
        <div className="my-4 text-center" style={details}>
          <img
            style={image}
            alt="User"
            src={
              responseData?.file &&
              `http://localhost:3000/uploads/${responseData?.file}`
            }
          />
          <div className="userfrm my-2">
            Username : {responseData?.username && responseData.username}{" "}
          </div>
          <div className="userfrm my-2">
            Fullname : {responseData?.fullname && responseData.fullname}{" "}
          </div>
          <div className="userfrm my-2">
            Email : {responseData?.email && responseData.email}{" "}
          </div>
          <div className="userfrm my-2">
            Phone : {responseData?.phone && responseData.phone}{" "}
          </div>
          <div className="userfrm my-2">
            Gender :{responseData?.gender && responseData.gender}{" "}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
