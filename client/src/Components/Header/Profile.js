import { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { Typography, Menu, MenuItem, makeStyles,Button,Box} from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';

const useStyle = makeStyles({
    component: {
        marginTop: 40,
        border: 5,
        borderRadius: 3,
    },
    logout: {
        fontSize: 14,
        marginLeft: 20
    },
    login: {
        color: 'black',
        background: '#FFFFFF',
        // textAlign:'center',
       
        fontWeight: 700,
    //    padding:'20px',
        borderRadius: 2,
        // padding: '20px 20px',
        margin:'20px auto',
        height: 40,
        boxShadow: 'none',
        fontSize: 16,
        width: 100,
        '&:hover':{
            cursor: 'pointer',
            
        }
    }
})

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyle();
    const history = useHistory();

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        setAccount('');
    }
    
    const OnUpload=() => {
        history.push(`/VkartStudio/${account}`)
    }


    return (
        <>
    
            <Link onClick={handleClick}><Typography style={{ marginTop: 27,fontSize:19}}>{account}</Typography></Link>
            <div>
            <button className={classes.login} onClick={OnUpload}>+ Studio</button>
            </div>
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                className={classes.component}
            >
                <MenuItem onClick={() => { handleClose(); logout();}}>
                    <PowerSettingsNew fontSize='small' color='primary'/> 
                    <Typography className={classes.logout}>Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    )    
}

export default Profile;