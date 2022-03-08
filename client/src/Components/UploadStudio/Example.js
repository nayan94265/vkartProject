import React,{ useEffect} from 'react';

import Avatar from '@mui/material/Avatar';
import { Canvas, useFrame } from "react-three-fiber";
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
import ShoeModel from '../Models/ShoeModel';
import { v4 as uuidv4 } from 'uuid';

const Example = () => {
    return (
        <>

 <ShoeModel/>

    
    </>
    )
}


export default Example;