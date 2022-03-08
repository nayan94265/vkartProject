import React,{ useEffect} from 'react';

import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';
import{useParams} from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { uploadFile, uploadProducts } from '../../service/api';
import axios from 'axios';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { Dialog, DialogContent, TextField, Box, Button, makeStyles, Typography } from '@material-ui/core';

import { v4 as uuidv4 } from 'uuid';

const UploadButton = styled(Button)({
  background: '#232F3F',

})
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#232F3F',
    },
    '&:hover fieldset': {
      borderColor: '#232F3F',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#232F3F',
    },
  },
});


const useStyle = makeStyles(theme => ({
    UploadData: {
      // background:'#232F3F',
      padding: '20px',
     
      margin:'0 auto',
      height: '100vh',
        width: '100vh',
        maxWidth: 'unset !important'
    //   borderWidth:'5px',

      },
      uploadButton:{
        color: 'white',
      },
      uploadProductDetails:{
        textAlign:'right',
        float: 'right',
        // border: '1px solid #232F3F',
        borderRadius: '10px',
        // borderStyle: 'double',
        borderWidth:'2px',
      }
     
  }))


const PostAdd = () => {
    const classes = useStyle();
    
    // const [ userProduct, setuserProduct ] =React.useState(userProductDetails);

    const [shorttitle, setshorttitle] = React.useState()
    const [longtitle, setlongtitle] = React.useState()
    const [discount, setdiscount] = React.useState()
    const [mrp, setmrp] = React.useState()
    const [cost, setcost] = React.useState()
    const [description,setdiscription] = React.useState()
    const [waranty, setwaranty] = React.useState()
    const [tagline, settagline] = React.useState()
    const [file, setFile] = React.useState('');

    

    var obj = useParams();
    const myJSON = JSON. stringify(obj); 
    var matchUserID = JSON.parse(myJSON);
  //  console.log(flightnodata);

    const userProductDetails = {
      id: uuidv4(),
      url: '',
      title: {
        shortTitle:shorttitle,
        longTitle:longtitle,
      },
      price: {
        mrp:mrp ,
        cost:cost, 
        discount: discount
  
      },
      description: description,
      waranty: waranty,
      tagline:tagline,
       userId:matchUserID.id,
      likes:0,
      dislikes:0,
      views:0,
      
  };

  useEffect(() => {
    const getImage = async () => { 
      //  console.log(file);
        if(file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
            
            const image = await uploadFile(data);
            userProductDetails.url = image.data;
        }
    }
    getImage();
   
}, [file])


  const productSend = async(event) => {
   // event.preventDefault();
    
    let response = await uploadProducts(userProductDetails);
    
console.log(userProductDetails);
   
    if(!response) 
    return;
  }


    return (
      <div>
        
        <h1><i>Upload Product Details</i></h1>
        <Divider/>
        <Box component="form" noValidate sx={{ mt: 1 }}>

        <form onSubmit={()=> productSend()}>
 
        <CssTextField
              onChange={(e) => setlongtitle(e.target.value)} 
              margin="normal"
              required
              fullWidth
              id="longtitle"
              label="Long Title"
              name="longtitle"
              defaultValue={longtitle}
              autoComplete="text"
              autoFocus
            />

            <CssTextField
            onChange={(e) => setshorttitle(e.target.value)} 
              margin="normal"
              required
              defaultValue={shorttitle}
              id="shorttitle"
              label="Short Title"
              name="shorttitle"
              autoComplete="text"
              autoFocus
              sx={{ mr: 2 }}
             
            />
            
             <CssTextField
             onChange={(e) => setdiscount(e.target.value)} 
             defaultValue={discount}
              margin="normal" 
              id="discount"
              label="Discount"
              name="discount"
              autoComplete="text"
              autoFocus
             
            />
            <CssTextField
            onChange={(e) => setmrp(e.target.value)} 
              margin="normal"
              defaultValue={mrp}
              name="mrp"
              label="M.R.P"
              type="number"
              id="mrp"
              autoComplete="number"
              sx={{ mr: 2 }}
            />
            <CssTextField
            onChange={(e) => setcost(e.target.value)} 
            defaultValue={cost}
            required
              margin="normal" 
              id="cost"
              label="Cost (Price)"
              name="cost"
              autoComplete="number"
              autoFocus
             
            />
            <CssTextField
            onChange={(e) => setwaranty(e.target.value)} 
            defaultValue={waranty}
              margin="normal" 
              fullWidth
              required
              id="waranty"
              label="Waranty"
              name="waranty"
              autoComplete="text"
              autoFocus
             
            />
         
            <CssTextField
            onChange={(e) => settagline(e.target.value)}  
            defaultValue={tagline}
              margin="normal" 
              fullWidth
              id="tagline"
              label="Tagline"
              name="tagline"
              autoComplete="text"
              autoFocus
             
            />

             <CssTextField
             onChange={(e) => setdiscription(e.target.value)}  
             defaultValue={description}
              margin="normal" 
              fullWidth
              id="discription"
              label="Discription"
              name="discription"
              multiline
              rows={3}
              autoComplete="text"
              autoFocus
            />

<div  style={{ width: '190px', height: '180px', border: '2px solid #232F3F',borderRadius: '20px',margin:'0 auto',textAlign: 'center'}}>
            <label htmlFor="fileInput">
                    <FileUploadRoundedIcon  style={{ fontSize: '7rem' }} fontSize="large" color="action" />
                    <p>Upload Image</p>
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                    multiple
                />
           </div>
           <div>
               <p>{file.name}</p>
               
           </div>
           <Typography align='center'>
            <UploadButton
            className={classes.uploadButton}
            onClick={()=> productSend()}
              type="submit"
             
              variant="contained"
              //  color="secondary"
              disableRipple
              size="large"
              sx={{ mt: 3, mb: 1,padding:'20px',fontSize:'20px' }}
            >
              Upload 
            </UploadButton>
            </Typography>
            
            </form>
          </Box>
        
          
          
                          
    
        <div>
        

          
        </div>
        
 </div>

        )
}


export default PostAdd;