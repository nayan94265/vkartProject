import axios from 'axios';

const url = 'http://localhost:8000';
// const url = 'https://vkart-4f334.web.app';

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`http://localhost:8000/login`, user)
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`http://localhost:8000/signup`, user)
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}

export const getProductById = async (id) => {
    try {
        return await axios.get(`http://localhost:8000/product/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}

export const uploadProducts = async (product) => {
    try {
        return await axios.post(`http://localhost:8000/uploadProducts`,product);
    } catch (error) {
        console.log('Error while uploading product by id response', error);
    
    }
}

export const uploadFile = async (post) => {
    // console.log(post);
    try {
        return await axios.post(`${url}/file/upload`, post);
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}
export const getuserProductdetails = async (id) => {
    try {
        let response= await axios.get(`http://localhost:8000/getuserProductdetails/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}
// export const getalluserProductdetails = async () => {
//     try {
//         let response= await axios.get(`http://localhost:8000/getalluserProductdetails`);
//         return response.data;
//     } catch (error) {
//         console.log('Error while getting product by id response', error);
//     }
// }

export const updateVisibility = async (id,toggleValue) => {
    try {
       return await axios.post(`http://localhost:8000/updatevisibility/${id}/value=${toggleValue}`,);
       
    } catch (error) {
        console.log('Error while updating updateVisibility', error);
    }
}