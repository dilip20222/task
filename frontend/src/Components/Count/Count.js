import React from "react";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { CSpinner } from "@coreui/react";
import { useSelector } from "react-redux";

export const Count = ({ title, count }) => {
  const loading = useSelector((state) => state.Setcount?.counts || null);
  console.log("Count Loading __________", loading);

  return (
    <div className="d-flex flex-wrap" style={{ width: "100vw" }}>
      <div
        className="card my-4 mx-4"
        style={{
          width: "20rem",
          height: "200px",
          background: "linear-gradient(#444 , #999 , #333)",
        }}
      >
        <div className="card-body text-center" style={{display:'flex' , flexDirection : 'column' , alignItems : 'center' }}>
          <h1 className="card-title text-info">
            <SupervisedUserCircleOutlinedIcon /> {title}
          </h1>
          {loading ? (
            <CSpinner color="danger" className="d-flex align-center" />
          ) : (
            <h1 className="my-5 text-white">{count}</h1>
          )}
        </div>
      </div>
    </div>
  );
};
