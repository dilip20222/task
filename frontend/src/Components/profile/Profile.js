import React, { useState } from "react";
import axios from "axios";


export const Profile = () => {


  let [responseData, setResponseData] = React.useState({})
  console.log(responseData)
  const token = localStorage.getItem('token');


  React.useEffect(() => {
    fetch("http://localhost:3000/api/",{headers :{tokens : `${token}`}})
    .then(response => response.json())
   
    .then(data => setResponseData(data))
  },[])

  return (
    <div className="conatiner">
      <div className="maincard p-4">
        <h1>User Profile</h1>
        <div className="my-4">
          <div className="userfrm my-2">Fullname : {responseData.fullname}  </div>
          <div className="userfrm my-2">Email : {responseData.email} </div>
          <div className="userfrm my-2">Phone : {responseData.phone} </div>
          <div className="userfrm my-2">Gender :{responseData.gender} </div>
          <div className="userfrm my-2">Date :{responseData.date} </div>
          <img 
           src={responseData?.file && `http://localhost:3000/uploads/${responseData?.file}`}
          // src={'https://www.gardendesign.com/pictures/images/675x529Max/site_3/helianthus-yellow-flower-pixabay_11863.jpg'}
          />
          {/* <div className="userfrm my-2">Image :{responseData.file}</div> */}
        </div>
      </div>
    </div>
  );
};
