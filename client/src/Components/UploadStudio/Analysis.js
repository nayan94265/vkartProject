import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import * as tf from '@tensorflow/tfjs';
import { getuserProductdetails,updateVisibility } from '../../service/api';
import { useParams } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Stack from '@mui/material/Stack';
import { withStyles} from '@material-ui/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const label = { inputProps: { 'aria-label': 'Switch demo' } };




const Analysis = () => {

    const [userproductDetails, setuserproductDetails] = useState();
    const [toggleValue,settoggleValue] = useState(true);
    
    const toggleArray = [];
   

    var obj = useParams();
    const myJSON = JSON. stringify(obj); 
    var userIdobj = JSON.parse(myJSON);
   

const togglefunc = async (id,e)=>{

// console.log(e);
let response = await updateVisibility(id,toggleValue);
if(!response) return;

  if(toggleValue === false){
settoggleValue(true);
}
else{
  settoggleValue(false);
}


}

useEffect(() => {
        const fetchData = async () => {
            var data = await getuserProductdetails(userIdobj.id);
            setuserproductDetails(data);
            
        }
        fetchData();
    }, []);  
    // console.log(userproductDetails) ;

    return <div>
        <h1><i>Profile Analytics</i></h1>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,fontSize:40 }}  stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow sx={{fontFamily:"'Bebas Neue', cursive"}}>
            <TableCell  sx={{ fontSize:26,fontFamily:"'Bebas Neue', cursive" }} >Name</TableCell>
            <TableCell sx={{fontSize:26,fontFamily:"'Bebas Neue', cursive" }}  align="center">Cost $</TableCell>
            <TableCell sx={{fontSize:26,fontFamily:"'Bebas Neue', cursive" }}  align="center">Waranty</TableCell>
            {/* <TableCell align="center">Date</TableCell> */}
            <TableCell sx={{fontSize:26,fontFamily:"'Bebas Neue', cursive" }}  align="center">Views</TableCell>
            
            <TableCell sx={{fontSize:26,fontFamily:"'Bebas Neue', cursive" }}  align="center">Likes/Dislikes</TableCell>
            <TableCell sx={{fontSize:26,fontFamily:"'Bebas Neue', cursive" }}  align="center">Visibility</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {userproductDetails && userproductDetails.filter(productmain=>productmain).map((row, index) => ( 
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{fontSize:17 }} component="th"  scope="row">
                {row.title.shortTitle}
              </TableCell>
              <TableCell sx={{fontSize:17 }} align="center">{row.price.cost}</TableCell>
              <TableCell sx={{fontSize:17 }} align="center">{row.waranty}</TableCell>
              <TableCell sx={{fontSize:17 }} align="center">{row.views}</TableCell>
               <TableCell sx={{fontSize:17 }} align="center">{row.likes} <ThumbUpIcon/> <hr/> {row.dislikes}<ThumbDownIcon/></TableCell>
              <TableCell sx={{fontSize:17 }} align="center">

              <Switch 
               onChange={(e)=>togglefunc(row.id,e)}
            //  checked={row.visibility==true}
               color="success" />

               {/* {row.visibility=='true'&&<VisibilityIcon onClick={()=>togglefunc(row.id)} />}
               {row.visibility=='false'&&<VisibilityOffIcon onClick={()=>togglefunc(row.id)} />} */}
               
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>;
}


export default Analysis;