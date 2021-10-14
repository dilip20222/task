import React from "react";
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';

export const Count = ({title, count}) => {
  return (
      <div className="d-flex flex-wrap" style={{width:'100vw'}}>
        <div
          className="card my-4 mx-4"
          style={{ width: "20rem", height: "200px" ,background: "linear-gradient(#444 , #999 , #333)"}}
        >
          <div className="card-body text-center">
            
            <h1 className="card-title text-info"><SupervisedUserCircleOutlinedIcon/> {title}</h1>
              <h1 className="my-5 text-white">{count}</h1>
          </div>
        </div>
      </div>
  );
};
