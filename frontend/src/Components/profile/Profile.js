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

const image = {
  width:"100px" ,
   borderRadius:'15px' , 
   objectFit:'cover',
}

const card = {
  background: "linear-gradient(#444 , #999 , #333)",
  borderRadius:'10px' ,
  color :'#d4de48'
}

const details={
  color:"white"
}

  return (
    <div className="conatiner" style={card}>
      <div className="maincard p-4">
        <h3>User Profile</h3>
        <div className="my-4 text-center" style={details} >
          <img style={image}
           src={responseData?.file && `http://localhost:3000/uploads/${responseData?.file}`}
          />
            <div className="userfrm my-2">Username : {responseData.username}  </div>
          <div className="userfrm my-2">Fullname : {responseData.fullname}  </div>
          <div className="userfrm my-2">Email : {responseData.email} </div>
          <div className="userfrm my-2">Phone : {responseData.phone} </div>
          <div className="userfrm my-2">Gender :{responseData.gender} </div>
        </div>
      </div>
    </div>
  );
};
