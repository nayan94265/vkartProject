import { useState, useEffect } from 'react';
import { Box, Typography, makeStyles, CircularProgress, Button,Grid } from '@material-ui/core';
import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
//import { getProductById } from '../../service/api';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getuserProductDetailsbyId } from '../../redux/actions/productActions';
import Header from '../Header/Header'

const useStyles = makeStyles( (theme)=>({
    component: {
        marginTop: 55,
        background: '#F2F2F2',
        [theme.breakpoints.down('sm')]:{
            marginLeft:'20px'

        }
    },
    container: {
        background: '#FFFFFF',
        // margin: '0 80px',
        display: 'flex',
        [theme.breakpoints.down('md')]:{
            margin: '0'

        }
    },
    rightContainer: {
        marginTop: 50,
        '& > *': {
            marginTop: 10
        }
    },
    price: {
        fontSize: 28
    },
    smallText: {
        fontSize: 14,
    },
    greyTextColor: {
        color: '#878787',
        flex: 1,
        fontsize:4,
        

    }
}));

const data = { 
    id: '',
    url: '', 
    detailUrl: '',
    title: {
        shortTitle: '',
        longTitle: '',
    }, 
    price: {
        mrp: 0,
        cost: 0,
        discount: ''
    },
    description: '',
    discount: '', 
    tagline: '' 
};

const UserDetailView = ({ history, match }) => {
    const classes = useStyles();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    // const [ product, setProduct ] = useState(data);
    // const [ loading, setLoading ] = useState(false);
    // const { id } = useParams();

    // const [ quantity, setQuantity ] = useState(1);

    const {  product }  = useSelector(state => state.getuserProductDetailsbyId);
    
 // console.log(product);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(product && match.params.id !== product.id)   
            dispatch(getuserProductDetailsbyId(match.params.id));
    }, [dispatch]);

    return (
        
        <Box className={classes.component}>
            <Header/>

            { product && Object.keys(product).length &&
                <Container>
  <ProductDetails> 
     <p>{product.title.longTitle}</p>
     
     <div style={{display: 'flex',margin:'20px'}}>
     <div style={{flex:1,marginRight:'10px'}} >₹{product.price.cost}</div>
     
     <div className={classes.greyTextColor}><strike>{product.price.mrp}</strike></div>
  
    
     </div>
     {/* ₹ */}
    <div>
         <ActionItem  product={product}/>
    </div>
   </ProductDetails>
   <div style=
       {{display: 'flex',margin:'auto',background:'white',minHeight:'500px',justifyContent:'center',borderRadius:'10px',marginLeft:'auto',marginRight:'auto',width: '900px'}} 
         >
       <img src={product.url}/>
      </div>

                            
                </Container>
            }   
        </Box>
    )
};



const Container = styled.div`
background-color:#D1E6EA;
margin-top:100px;
box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
      width: 1200px;
display: flex;
justify-content:center ;

border-radius:10px;
margin-left: auto;

min-height: 600px;
margin-right: auto;


`;

const ProductDetails=styled.div`
/* background-color:#D1E6EA; */
padding:20px;
width: 300px;
border-right: 1px solid white;
/* &:nth-child(1) {
      
        background-color:blue;
    } */
    > * {
      &:first-child {
        text-transform: uppercase;
        font-size:40px;
        color: #46667C;
        font-family: 'Bebas Neue', cursive;
      }
      &:nth-child(2){
        font-size:55px;
        text-transform: uppercase;
        color: #46667C;
        font-family: 'Bebas Neue', cursive;
      
      
      }
    }
`;


export default UserDetailView;