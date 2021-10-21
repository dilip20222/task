import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import errorimg from '../error/visuals-JpTY4gUviJM-unsplash.jpg'
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';

export default function AuthError() {
  return (
    <div className="carf" style={{display:'flex' , justifyContent:'center' , height : '100vh' , alignItems:'center'}}>

    <Card>
      <CardMedia
        component="img"
        height="500px"
        image={errorimg}
        alt="green iguana"
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="text-center">
         <SentimentDissatisfiedOutlinedIcon/> Authantication Required
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  </div>
  );
}
