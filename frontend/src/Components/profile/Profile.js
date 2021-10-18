import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getuserprofile } from "../../store/oneuser/profileAction";

export const Profile = () => {
  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.profiles?.profile || null);
  const loading = useSelector((state) => state.profiles?.loading || false);
  console.log("Loadinnnnnnggggg >>>>>>." , loading)
  console.log("Profile Data>>>>>>>>>>", responseData);
   
  React.useEffect(() => {
    dispatch(getuserprofile())
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
