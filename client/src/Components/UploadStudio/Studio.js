import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import LoginDialog from '../Login/LoginDialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles } from '@material-ui/core';
import Dashboard from './Dashboard'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsTwoToneIcon from '@mui/icons-material/AnalyticsTwoTone';
import Analysis from './Analysis';
import { ListItemButton } from '@mui/material';
import{useParams} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import PostAdd from './PostAdd.js'
import UploadModelDetails from './UploadModelDetails.js'
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import { BrowserRouter as Router ,  Switch,Route,Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ShoeModel from '../Models/ShoeModel';
import Delayed from './Delayed';
import ModelRepository from './ModelRepository';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';


const useStyle = makeStyles(theme => ({
  header: {
    background: '#232F3F',
    height: '80px'
    },
    userProfile:{
    marginRight:'10px',
 fontSize: '25px',
  color: '#232F3F',
  textAlign: 'center',
//   background: '#fff',
//   border: '4px solid #FD3C20',
    },
    login: {
      color: 'black',
      background: '#FFFFFF',
      // textAlign:'center',
     
      fontWeight: 700,
  //    padding:'20px',
      borderRadius: 5,
      // padding: '20px 20px',
      position: 'absolute',
     
      top: '0',
      // margin:'auto auto',
      marginTop:'11px',
      marginLeft:'30px',
      height: 60,
      boxShadow: 'none',
      fontSize: 25,
      width: 100,
      '&:hover':{
          cursor: 'pointer',
          
      }
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

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Studio({account, setAccount}) {
  const [ openDialog, setOpenDialog ] = React.useState(false);
  const [Timer, setTimer] = React.useState('10s')
  const theme = useTheme();
  const classes = useStyle();
  const [ open, setOpen ] = React.useState(true);
  const [listClicked, setlistClicked] = React.useState('postadd');
  var obj = useParams();
  // console.log(obj);
  const myJSON = JSON. stringify(obj); 
  var userIdobj = JSON.parse(myJSON);
  // console.log(userIdobj);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openDialogfunction = () => {
    setOpenDialog(true);
}


 
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}  >
        <Toolbar className={classes.header}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
           Vkart Studio
          </Typography>
          {/* <div>
            <button className={classes.login} onClick={openDialogfunction} >+ Sell</button>
            </div> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        <div className={classes.userProfile}>
     <p>{userIdobj.id}</p>
        </div>

         <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userIdobj.id.charAt(0).toUpperCase()}
          </Avatar>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
 

        <List>
        <ListItemButton onClick={()=>setlistClicked('postadd')}>
            <ListItemIcon>
            <PostAddTwoToneIcon/>
            </ListItemIcon>
            <ListItemText >Post Add</ListItemText>

          </ListItemButton>

          {/* <Link to={`/shoe/${userIdobj.id}`} style={{textDecoration: 'none'}}> */}
          <Link to="/shoe" style={{textDecoration: 'none'}}>
          <div >
          <ListItemButton >
            <ListItemIcon>
            <AddCircleOutlineIcon/>
            </ListItemIcon>
            <ListItemText sx={{color:'black'}} >UploadModel</ListItemText>

          </ListItemButton>
          </div>
          </Link>
        
          <ListItemButton onClick={()=>setlistClicked('dashboard')}>
            <ListItemIcon>
            <DashboardIcon/>
            </ListItemIcon>
            <ListItemText >Dashboard</ListItemText>

          </ListItemButton>

          <ListItemButton onClick={()=>setlistClicked('analytics')} >
            <ListItemIcon>
            <AnalyticsTwoToneIcon/>
            </ListItemIcon>
            <ListItemText  >Analytics</ListItemText>

          </ListItemButton>

          <Link to="/ModelRepo" style={{textDecoration: 'none'}}>
            <div>
            <ListItemButton onClick={()=>setlistClicked('ModelRepository')} >
            <ListItemIcon>
            <StorageTwoToneIcon/>
            </ListItemIcon>
            <ListItemText sx={{color:'black'}} >Model Repository</ListItemText>

          </ListItemButton>
            </div>
          
          </Link>
        </List>
        <Divider />
        {/* <List> 
          {['Seetings', 'Trash', 'Sent feedback'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                
               
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader /> */}
       {/* {PostAddDialog UploadModelDetails
        listClicked && listClicked=='dashboard'? <Dashboard userid={userIdobj.id}/>:<Analysis/>
       }   */}
        {
         listClicked=='postadd' && <PostAdd />
       } 
      
      
        {
         listClicked=='dashboard' && <Dashboard userid={userIdobj.id}/>
       } 
      
        {
         listClicked=='analytics' && <Analysis userid={userIdobj.id}/>
       } 
       {
         listClicked=='ModelRepository' && <ModelRepository userid={userIdobj.id}/>
       } 
      </Box>
     
      
    </Box>
  );
}
