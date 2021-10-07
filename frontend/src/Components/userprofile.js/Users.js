import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../../store/store";

export default function Users() {

  const dispatch = useDispatch();
  const userprofiles = useSelector(state => state?.profiles?.alluser || null);

  useEffect(() => {
    if(!userprofiles) {
      axios.get("http://localhost:3000/api/getuser").then((res) => {
        dispatch(users(res.data));
      });
    }
  }, [userprofiles]);
  
    const handleSubmit = (userId) => {
        axios.delete(`http://localhost:3000/api/delete/${userId}`)
        .then((res)=>{
        dispatch(users(userprofiles.filter((single) => single._id !== userId)));
        console.log(res)
      })
    }
      
      // setResponseData((data) => (
      //     data.filter((d) => d._id !== userId)
      // ))

  return (
    <>  
    <div className="d-flex flex-wrap">
      <div className="my-2" style={{width:'1200px' , height:'100vh', display:'flex' , flexWrap:'wrap' , flexDirection:'row'}}>
        { userprofiles &&userprofiles?.map((product , i) => (
          <Card sx={{ maxWidth: 300 }} className="mx-3 my-3 p-2" key={i}>
            <CardMedia
              component="img"
              height="140"
              src={
                product?.file &&
                `http://localhost:3000/uploads/${product?.file}`
              }
              // image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.username}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                {product.email}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                {product.phone}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {product.gender}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {product.fullname}
              </Typography>
            </CardContent>

            <CardActions>
          {product?._id && <Button size="small" onClick={()=>handleSubmit(product._id)}>Delete</Button>}
            </CardActions>
          </Card>
        ))}
      </div>
      </div>
    </>
  );
}
