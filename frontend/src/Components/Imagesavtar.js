import * as React from "react";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Button from "@mui/material/Button";

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        style={{ color: "blue" }}
        onClick={handleClick}
      >
        <RemoveRedEyeOutlinedIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <img
          src={`http://localhost:3000/uploads/${props.file}`}
          style={{
            borderRadius: "50%",
            border:"5px dashed #666",
            width: "300px",
            objectFit: "center",
            height: "250px",
          }}
          alt={props.file}
        />
      </Popover>
    </div>
  );
}
