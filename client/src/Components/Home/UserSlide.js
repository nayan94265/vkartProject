import React,  { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { Box, Typography, makeStyles, Button, Divider } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
 import {userProduct} from '../../Constant/userproductData.js'
// import {dealData} from '../../Constant/data.js'
 //import axios from "axios";
//  import {getalluserProductdetails} from '../../service/api';
//import Image from '/imageBack/iconicback.jpg';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
    }
};

const useStyle = makeStyles( (theme) =>({
    component: {
        marginTop: 12,
        background: '#FFFFFF'
    }, 
    timer: {
        color: '#7f7f7f',
        marginLeft: 10,
        display: 'flex',
        alignItems: 'center'
    },
    image: {
        width: 'auto',
        height: 150,
        borderRadius: '30px'
    },
    text: {
        fontSize: 14,
        marginTop: 5
    },
    deal: {
        display: 'flex',
        padding: '15px 20px'
    },
    dealText: {
        fontSize: 22,
        fontWeight: 600,
        lineHeight: '32px',
        marginRight: 25
    },
    button: {
        marginLeft: 'auto',
        backgroundColor: '#FD3C20',
        borderRadius: 2,
        fontSize: 13
    },
    wrapper: {
        padding: '40px 15px',
        backgroundImage: `url(/imageBack/pescardback1.png)`,
       backgroundPosition:'center',
       backgroundSize:'cover',
       backgroundRepeat: 'no-repeat',
       margin: '10px',
        borderRadius:10,


      
    },
    userNameBox:{ 
        position:'absolute',
        top: '0',
        right: '0',
        marginTop: '11px',
        color: 'red',
        fontSize: '16px'
    },
    timer: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
    }

}))

const UserSlide = ({  title, timer }) => {


    // const [productDetails, setproductDetails] = useState();
    // const dispatch=useDispatch();
    const classes = useStyle();
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';


    // useEffect(() => {
       
    //     axios.get('http://localhost:8000/getalluserProductdetails')
    //     .then((response) =>{
    //         console.log(response);
        
            
    //     })
    //     .catch((error) =>{
    //         console.log(error);
    //     });
     
        
    // }, []);

 

    const renderer = ({ hours, minutes, seconds }) => {
        return <span className={classes.timer}>{hours} : {minutes} : {seconds}  Left</span>;
    };
    
    return (
        <Box className={classes.component}>
            <Box className={classes.deal}>
                <Typography className={classes.dealText}>{title}</Typography>
                {
                    timer && <Box className={classes.timer}>
                                <img src={timerURL} style={{ width: 24 }} alt='time clock' />
                                <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                        </Box>
                }
                <Button variant="contained" color="primary" className={classes.button}>View All</Button>
            </Box>
            <Divider/>
            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                centerMode={true}
                infinite={false}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                      >
                {userProduct.map((temp) => (
                        <Link  to={`userProduct/${temp.id}`} style={{textDecoration: 'none'}}>
                            <Box  textAlign="center"  className={classes.wrapper}>
                                <Box className={classes.userNameBox}><i>{temp.userId}</i></Box>
                                <img src={temp.url} className={classes.image} />
                                <Typography className={classes.text} style={{ fontWeight: 600, color: '#212121' }}>{temp.title.shortTitle}</Typography>
                                <Typography className={classes.text} style={{ color: 'green' }}>{temp.price.discount}</Typography>
                                <Typography className={classes.text} style={{ color: '#212121', opacity: '.6' }}>{temp.tagline}</Typography>
                            </Box>
                        </Link>
                    ))
                }
            </Carousel>
        </Box>
    )
};




export default UserSlide;