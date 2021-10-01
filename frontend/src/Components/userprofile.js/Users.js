import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useHistory } from "react-router";



export default function Users() {
  let [responseData, setResponseData] = React.useState([]);
    const history = useHistory()
    
    console.log(responseData);
    
    const handleSubmit = (userId) => {
        axios.delete(`http://localhost:3000/api/delete/${userId}`).then((res)=>{
            setResponseData((data) => (
                data.filter((d) => d._id !== userId)
            ))
        });
    }
    React.useEffect(() => {
      axios.get("http://localhost:3000/api/getuser").then((res) => {
        setResponseData(res.data);
      });
    }, []);
  


  return (
    <>
      <div className="d-flex flex-wrap justify-content-center my-2">
        { responseData &&responseData.map((product , i) => (
          <Card sx={{ maxWidth: 345 }} className="mx-3 my-3 p-2" key={i}>
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
              <Typography variant="body2" color="text.secondary">
                {product.fullname}
              </Typography>
            </CardContent>

            <CardActions>
          {product?._id && <Button size="small" onClick={()=>handleSubmit(product._id)}>Delete</Button>}
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
}
