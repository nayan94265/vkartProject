import React,{ Suspense, useRef, useState, useEffect} from 'react';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import { Canvas, useFrame } from "react-three-fiber";
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { proxy, snapshot, useSnapshot } from "valtio";
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { uploadFile, uploadProducts } from '../../service/api';
import axios from 'axios';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { Dialog, DialogContent, TextField, Box, Button, makeStyles, Typography } from '@material-ui/core';
import ShoeModel from '../Models/ShoeModel';
import { v4 as uuidv4 } from 'uuid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory,useParams } from "react-router-dom";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};


const state = proxy({
  current: null,
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
});


export function Shoe() {
  const snap = useSnapshot(state);
  const ref = useRef();

  const { nodes, materials } = useGLTF("shoetutorial.glb")

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])



  

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
   
    <group
   
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
     >
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} 
      material-color={snap.items.laces}/>
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} 
      material-color={snap.items.mesh}/>
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} 
      material-color={snap.items.caps}/>
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={snap.items.inner}/>
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole}
      material-color={snap.items.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={snap.items.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band}
      material-color={snap.items.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={snap.items.patch}  />
    
    </group>
   
  )
};


export function ShoeMesh() {
  const snap = useSnapshot(state);
  const ref = useRef();

  const { nodes, materials } = useGLTF("shoetutorial.glb")

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])



  

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (

    <group
   
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
     >
     
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} 
      material-color={snap.items.mesh}/>
     
    
    </group>
    
   
  )
};

export function Shoelaces() {
  const snap = useSnapshot(state);
  const ref = useRef();

  const { nodes, materials } = useGLTF("shoetutorial.glb")

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])



  

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
   
    <group
   
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
     >
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} 
      material-color={snap.items.laces}/>
     
     
      {/* <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={snap.items.inner}/> */}
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole}
      material-color={snap.items.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={snap.items.stripes} />
      
      
    
    </group>
   
  )
};



export function Shoeinner() {
  const snap = useSnapshot(state);
  const ref = useRef();

  const { nodes, materials } = useGLTF("shoetutorial.glb")

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])



  

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
   
    <group
   
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
     >
      
     
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={snap.items.inner}/>
      
      
      
    
    </group>
   
  )
};

const UploadButton = styled(Button)({
  background: '#232F3F',

})



const useStyle = makeStyles(theme => ({
    UploadData: {
      // background:'#232F3F',
      padding: '20px',
     
      margin:'20px auto',
      height: '80vh',
        width: '195vh',
        maxWidth: 'unset !important'
    //   borderWidth:'5px',

      },
      uploadButton:{
        color: 'white',
      },
      header: {
        background: '#232F3F',
        height: '80px'
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

  const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});





const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
    
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));




function Picker(props) {
  const snap = useSnapshot(state);
  

  return (
    <div style={{ display: props.value ? "block" : "none",height:'10px' }} >
      
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      {/* <CancelSharpIcon visibility={togglePicker} onclick={()=> closePicker(togglePicker)}/> */}
      <h3><i>{snap.current}</i></h3>
    </div>
  );
}




const UploadModelDetails = () => {
    const classes = useStyle();
    // const [ userProduct , setuserProduct ] = React.useState(userProductDetails);
    const [file, setFile] = React.useState('');
    const [progress, setProgress] = React.useState(10);
    const [checked, setChecked] = React.useState(false);
    const [confirmClicked, setconfirmClicked] = useState('true')
  
    let history = useHistory();
    const snap = useSnapshot(state);

    var obj = useParams();
    const myJSON = JSON. stringify(obj); 
    var matchUserID = JSON.parse(myJSON);
   // constconsole.log(file);

 

   const handleChange = () => {
     setChecked((prev) => !prev);
   };
const ArrowClicked=()=>{
  console.log('clickeed');
  history.goBack()
}
    return (
      <>
   
      <Box>
    
       <CssBaseline />
      <AppBar position="fixed"  >
        <Toolbar className={classes.header}>
          {/* <div onclick={ArrowClicked()}>
        <ArrowBackIcon fontSize="large" />
        </div> */}
          <Typography variant="h4" noWrap component="div">
           Vkart Studio
          </Typography>
          {/* <div>
            <button className={classes.login} onClick={openDialogfunction} >+ Sell</button>
            </div> */}
        </Toolbar>
      </AppBar>
      </Box>
     
         
       
      <div style={{padding:'20px',marginTop:'100px'}} >
      <Slide direction="down" in={!file} mountOnEnter unmountOnExit>
<div  style={{ width:' 30%', height: '424px', border: '2px solid #232F3F',borderRadius: '20px',textAlign: 'center',float: 'left',marginRight:'40px'}}>

<p style={{fontSize:'25px',marginTop:'10px'}}><b>Upload your 3D Model</b></p>

<div style={{border:'2px dashed blue',width:'340px',height:'250px',margin:'4px auto',background:'#F5F8FF',textAlign: 'center',justifyContent: 'center',borderRadius:'30px'}}>
            <label htmlFor="fileInput">
            <div  style={{ margin:'50px auto' }} >
                    <CreateNewFolderIcon  style={{ fontSize: '7rem' }} fontSize="large" color="action" />
                    <p><i>Drag and drop your files here</i></p>
                    </div>
                    
                </label>
           

                </div>
          
                
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                  
                    multiple
                />
                      {/* <Box sx={{ width: '90%',marginTop: '50px'}}>
    <p>Uploading ....</p>  <LinearProgressWithLabel value={progress} />
    </Box> */}
    {
      file ? <div style={{background: 'whitesmoke',padding:'5px',borderRadius:'7px',width:'150px',margin:'10px'}}>
        <CancelSharpIcon fontSize="large" sx={{float:'right'}} />
        <p>{file.name}</p>
      </div> :<div style={{background: 'whitesmoke',padding:'5px',borderRadius:'7px',width:'150px',margin:'10px'}}>
        <p>None Model</p></div>

    }
    
    </div>
    </Slide>

    {
        file ? <div >
              <Canvas style=
       {{float: 'left',justifyContent:'center',height:'350px',borderRadius:'10px',background:'#F5F8FF',maxWidth:' 40%',opacity:'0.856'}}  concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 10],fov:10 }}>
        
        <ambientLight intensity={0.3} />
       <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <Suspense fallback={null}> 
      <Shoe/>
          
         
          {/* <Environment files="royal_esplanade_1k.hdr" /> */}
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={15} height={15} blur={2} far={1} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
        
      </Canvas>
     <Picker value={confirmClicked}/> 
      
      
      <div>
      
      </div>
      <div
      style={{float: 'right',padding:'20px',textAlign:'center',border:'1px solid black',borderRadius:'10px',width:'450px'}}>
    
        <TableContainer component={Paper}>
      <Table  size="small" aria-label="a dense table">
        
        <TableBody>
         
              <TableRow
             
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, background:snap.current== 'mesh' ? '#4d4746':'white'  }}
            >
              <TableCell align="center" sx={{color:snap.current== 'mesh' ? 'white':'black' }} >
              MESH:
              </TableCell>
              <TableCell sx={{background:snap.items.mesh}} align="center"></TableCell>
              
            </TableRow>
            <TableRow
             
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, background:snap.current== 'laces' ? '#4d4746':'white'  }}
            >
              <TableCell align="center" sx={{color:snap.current== 'laces' ? 'white':'black' }}  >
              LACES:
              </TableCell>
              <TableCell sx={{background:snap.items.laces}} align="center"></TableCell>
              
            </TableRow>
            <TableRow
             
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, background:snap.current== 'inner' ? '#4d4746':'white'  }}
            >
              <TableCell align="center" sx={{color:snap.current== 'inner' ? 'white':'black' }}  >
              INNER:
              </TableCell>
              <TableCell sx={{background:snap.items.inner}} align="center"></TableCell>
              
            </TableRow>
            <TableRow
             
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, background:snap.current== 'sole' ? '#4d4746':'white'  }}
            >
              <TableCell align="center" sx={{color:snap.current== 'sole' ? 'white':'black' }} >
              SOLE:
              </TableCell>
              <TableCell sx={{background:snap.items.sole}} align="center"></TableCell>
              
            </TableRow>

           
        <TableRow
             
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, background:snap.current== 'stripes' ? '#4d4746':'white'  }}
            >
              <TableCell align="center" sx={{color:snap.current== 'stripes' ? 'white':'black' }} >
              stripes:
              </TableCell>
              <TableCell sx={{background:snap.items.stripes}} align="center"></TableCell>
              
            </TableRow>


       
        </TableBody>
      </Table>
      
    </TableContainer>
    <Button variant="contained" color="success" size="large" style={{margin:'5px'}}> CONFIRM </Button></div>
      
      </div> 

      
      :<h2>EMPTY</h2>
}     
      </div>






{
  file ?
  <Slide direction="up" in={file}  >
  <Box sx={{ flexGrow: 1,width:'70%',height:'40px',background:'lightblue' }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
        
  <Canvas  concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 10],fov:10 }}>
       
   <ambientLight intensity={0.3} />
  <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
   <Suspense fallback={null}> 

 <ShoeMesh/>
     
    
     <Environment files="royal_esplanade_1k.hdr" />
     <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={15} height={15} blur={2} far={1} />
   </Suspense>
   <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
   
 </Canvas>

     
        </Grid>
        <Grid item xs={4}>
        
        <Canvas  concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 10],fov:10 }}>
             
         <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
         <Suspense fallback={null}> 
      
       <Shoelaces/>
           
          
           <Environment files="royal_esplanade_1k.hdr" />
           <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={15} height={15} blur={2} far={1} />
         </Suspense>
         <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
         
       </Canvas>
      
            
              </Grid>

              <Grid item xs={4}>
        
        <Canvas  concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 10],fov:10 }}>
             
         <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
         <Suspense fallback={null}> 
      
       <Shoeinner/>
           
          
           <Environment files="royal_esplanade_1k.hdr" />
           <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={15} height={15} blur={2} far={1} />
         </Suspense>
         <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
         
       </Canvas>
      
            
              </Grid>
      
      </Grid>
    </Box>
    </Slide>
  
  : <div></div>
}

    
    
      </>
        )
}


export default UploadModelDetails;