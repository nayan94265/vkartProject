import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade, InputBase } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    search: {
        borderRadius: 2,
        marginLeft: 10,
        width: '45%',
        backgroundColor: '#fff',
        display: 'flex'
      },
      searchIcon: {
         
        margin: 'auto',
        // width: '100px',
        padding: '8px 30px',
          display: 'flex',
        color: '#ffffff',
        backgroundColor:'#FD3C20',
        
        "&:hover": {
          // background: "#efefef",
          cursor: "pointer",
          color:'#232F3F',
         
          opacity: 0.7
        },
      },
      inputRoot: {
        fontSize: 'unset',
        width: '100%'
      },
      inputInput: {
        paddingLeft: 20,
        width: '100%',
    }
}))

const Search = () => {
    const classes = useStyle();
    const [ text, setText ] = useState();

    const getText = (text) => {
        setText(text);
        console.log(text);
    }

    return (
        <div className={classes.search}>
            <InputBase
              placeholder="Search for products, brands and more"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => getText(e.target.value)}
            />
            <div className={classes.searchIcon}>
              <SearchIcon  />
            </div>
        </div>
    )
}

export default Search;