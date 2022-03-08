import { AppBar, Toolbar, makeStyles, Box, Typography, withStyles,IconButton} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CustomButtons from './CustomButtons';
import Search from './Search';
import { Menu } from '@material-ui/core';

const useStyle = makeStyles({
    header: {
        background: '#232F3F',
        height: 70
    },
    component: {
        marginLeft: '12%',
        lineHeight: 0,
        color: '#FFFFFF',
        textDecoration: 'none'
    },
    logo: {
        width: 75,
        fontSize:30,
        fontWeight: 'bold',
        fontStyle:'italic',
        marginRight: '10px'

    },
    container: {
        display: 'flex',
    },
    subHeading: {
        fontSize: 10,
        fontStyle: 'italic',
       

    },
    subURL: {
        width: 10,
        height: 10,
        marginLeft: 4
    }
})

const ToolBar = withStyles({
    root: {
      minHeight: 70
    },
})(Toolbar);

const Header = () => {
    const classes = useStyle();
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';
    return (
        <AppBar position="fixed" className={classes.header}>
            <ToolBar>
                <IconButton color="white">
                    <Menu/>
                </IconButton>
                <Link to='/' className={classes.component}>
                    <Typography className={classes.logo}>Vkart</Typography>
                    {/* <Box component="span" className={classes.container}>
                        <Typography className = {classes.subHeading}>Explore <Box component="span" style={{color:'#FD3C20'}}>Plus</Box></Typography>
                        <img src={subURL} className={classes.subURL} />
                    </Box> */}
                </Link>
                <Search />
                <CustomButtons />
            </ToolBar>
        </AppBar>
    )
}

export default Header;