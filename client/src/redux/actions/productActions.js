import * as actionTypes from '../constants/productConstant';
import axios from 'axios';

// const url="https://vkart-4f334.web.app";
export const getProducts = () => async (dispatch) => {
    try {
        
        const { data } = await axios.get(`http://localhost:8000/products`);
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response });
    }
};

// export const getallProducts = () => async (dispatch) => {
//     try {
        
//         const { data } = await axios.get(`http://localhost:8000/getalluserProductdetails`);
        
//         dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });

//     } catch (error) {
//         dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response });
//     }
// };

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`http://localhost:8000/product/${id}`);
        console.log(data);

        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.response});

    }
};

export const getuserProductDetailsbyId = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`http://localhost:8000/userProduct/${id}`);
        console.log(data);

        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.response});

    }
};


export const removeProductDetails = () => (dispatch) => {
    
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });

};