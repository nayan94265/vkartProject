import { Box, makeStyles } from '@material-ui/core';

import Banner from './Home/Banner';
// import MidSlide from './Home/MidSlide';
// import MidSection from './Home/MidSection';
import Slide from './Home/Slide';
import UserSlide from './Home/UserSlide';
import React,  { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts} from '../redux/actions/productActions';
import Header from '../Components/Header/Header';
//import {getalluserProductdetails} from '../service/api';

const useStyle = makeStyles({
    component: {
        padding: 10,
        background: '#F2F2F2'
    }
})

const Home = () => {
    const classes = useStyle();
    //const [alluserproductDetails, setalluserproductDetails] = useState()

    const {products} = useSelector(state => state.getProducts);
 //   const {userproducts} = useSelector(state => state.getallProducts);
   

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
       
    }, [dispatch])

    return (
        <>
        <Header />
            {/* <NavBar /> */}
            <Box className={classes.component}>
                <Banner />
             
                {/* <MidSection />  */}
                <UserSlide
                title='Second Hand Deals of the Day'
                timer={true} 
                
                />

                <Slide 
                    data={products} 
                    title='Deals of the Day'
                    timer={true} 
                    multi={true} 
                />
             
             
               
            </Box>
        </>
    )
}

export default Home;