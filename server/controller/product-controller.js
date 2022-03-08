import userproductmodel from '../model/userproductSchema.js';
import Product from '../model/productSchema.js';

// import imageProduct from '../model/imageSchema.js'


export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});

        response.json(products);
    }catch (error) {
        console.error(error.message);

    }
}

export const uploadProducts=async(request, response)=>{
    try {

        // const exist = await userproductmodel.findOne({ id: request.body.id });
        // if(exist) {
        //     return response.status(401).messagejson({ message: 'Product already exist'});
        // }
        const product = request.body;
       
        const newProduct = new userproductmodel(product);
        
        await newProduct.save();
        
        response.status(200).json(`${product.discount}Product has been successfully registered`);
        
    } catch (error) {
        response.status(401).json(error.message);
    }
}

export const getProductById = async (request, response) => {
    try {
        
        const products = await Product.findOne({ 'id': request.params.id });
        response.json(products);
    }catch (error) {

    }
}

export const getuserProductdetails = async (request, response) => {
    try {
        
        const userProducts = await userproductmodel.find({ 'userId': request.params.id });
        response.status(200).json(userProducts);
    }catch (error) {
        response.status(500).json(error)
    }
}

export const getalluserProductdetails = async (request, response) => {
    try {
        
        const userProducts = await userproductmodel.find({});
        response.status(200).json(userProducts);
    }catch (error) {
        response.status(500).json(error)
    }
}

export const updateVisibility = async (request, response) => {
    try {
        
        const userProducts = await userproductmodel.updateOne({'id':request.params.id},{$set: {'visibility':request.params.toggleValue}
      
    });
        response.status(200).json(userProducts);
    }catch (error) {
        response.status(500).json(error)
    }
}


export const getuserProductById = async (request, response) => {
    try {
        
        const products = await userproductmodel.findOne({ 'id': request.params.id });
        response.json(products);
    }catch (error) {
        response.status(500).json(error);
    }
}