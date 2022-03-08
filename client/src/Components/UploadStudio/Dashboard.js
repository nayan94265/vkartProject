import React,{useState,useEffect} from 'react';
// import axios from 'axios';
import * as THREE from 'three'
import {getuserProductdetails} from '../../service/api';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { Box, Typography,  CircularProgress, Button} from '@material-ui/core';
import {Link} from 'react-router-dom'
import ShoeModel from '../Models/ShoeModel';
import clsx from 'clsx';
import { Canvas, useFrame } from "react-three-fiber";
import { minWidth } from '@mui/system';


const useStyle = makeStyles(theme => ({
    productCard:{
    //   border: '1px solid',
    //   borderRadius:'10px'

    },
    productCardContainer:{
      padding: '10px',
      
    },
    productImg:{
        objectFit:'contain'
    }
}))

const Dashboard = (props) => {
       const classes = useStyle();
const [userproductDetails, setuserproductDetails] = useState()


//  console.log(props.useridMain)

useEffect(() => {
    const fetchData = async () => {
        var data = await getuserProductdetails(props.userid);
        setuserproductDetails(data);
        
    }
    fetchData();
}, []);   
//  console.log(userproductDetails);

    
    return <div>

<h1 style={{textAlign: 'center'}}>Uploaded Products</h1> 
<Divider/>
<Grid className={classes.productCardContainer} container spacing={3}>

{userproductDetails && userproductDetails.filter(productmain=>productmain).map((row, index) => ( 
              <Grid className={classes.productCard} item xs={3} md={3}>
        <Card sx={{height:'400'}}>
      <CardMedia
        component="img"
        maxheight="100"
        image={row.url}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {row.title.shortTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {row.title.longTitle}
        </Typography>
      </CardContent>
      <Divider/>
      <CardActions sx={{textAlign:'center',align:'center'}}>
        {/* <Button size="large">Update</Button> */}
        <Link style={{textDecoration:'none'}} to={`/productDetialView/${row.id}`}><Button size="large">Show Preview</Button></Link>
      </CardActions>
    </Card>   
                  </Grid>       
            ))} 
</Grid>


    </div>;
}

export default Dashboard;