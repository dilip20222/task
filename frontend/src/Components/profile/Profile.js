import React, { useState } from "react";
import axios from "axios";


export const Profile = () => {


  let [responseData, setResponseData] = React.useState({})
  // console.log(responseData)
  const token = localStorage.getItem('token');


  React.useEffect(() => {
    fetch("http://localhost:3000/api/",{headers :{tokens : `${token}`}})
    .then(response => response.json())
   
    .then(data => setResponseData(data))
  },[])

  return (
    <div className="conatiner">
      <div className="maincard p-4">
        <h3>User Profile</h3>
        <div className="my-4">
          <img style={{width:"100px"}}
           src={responseData?.file && `http://localhost:3000/uploads/${responseData?.file}`}
          />
            <div className="userfrm my-2">Username : {responseData.username}  </div>
          <div className="userfrm my-2">Fullname : {responseData.fullname}  </div>
          <div className="userfrm my-2">Email : {responseData.email} </div>
          <div className="userfrm my-2">Phone : {responseData.phone} </div>
          <div className="userfrm my-2">Gender :{responseData.gender} </div>
          {/* <div className="userfrm my-2">Date :{responseData.date} </div> */}
          {/* <div className="userfrm my-2">Image :{responseData.file}</div> */}
        </div>
      </div>
    </div>
  );
};
