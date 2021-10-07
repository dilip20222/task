import axios from "axios";
import React from "react";

export const Count = ({title, count}) => {
  
  return (
    <>
      <div className="d-flex flex-wrap">
        <div
          className="card my-4 mx-4"
          style={{ width: "18rem", height: "200px" }}
        >
          <div className="card-body text-center">
            <h1 className="card-title">{title}</h1>
              <h1 className="my-5">{count}</h1>
          </div>
        </div>
      </div>
    </>
  );
};
