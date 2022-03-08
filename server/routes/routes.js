import express from  'express';
import { getProductById, getProducts,uploadProducts,getuserProductdetails,getalluserProductdetails,updateVisibility,getuserProductById} from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { uploadImage,getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';




const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.get('/userProduct/:id', getuserProductById);
router.post('/uploadProducts',uploadProducts);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.get('/getuserProductdetails/:id',getuserProductdetails );
router.get('/getalluserProductdetails',getalluserProductdetails );
router.post('/updatevisibility/:id/value=:toggleValue',updateVisibility);

export default router;