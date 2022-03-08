import Product from './model/productSchema.js';
import { products } from './constants/product.js';

const DefaultData = async () => {
    try {
        await Product.deleteMany({});
        // install fresh data and delete onl data to avoid duplicates
    
        await Product.insertMany(products);
        //insert all data from constants
        console.log('Data imported Successfully');
        
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

export default DefaultData;