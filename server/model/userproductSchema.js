import mongoose from 'mongoose';
// import autoIncrement from 'mongoose-auto-increment';

const userproductSchema = new mongoose.Schema({
    id: String,
    url: String,
    title: Object,
    price: Object,
    description: String,
    waranty:String,
    tagline: String,
    image: Array,
    userId: String,
    visibility: {
        type: String,
        required: false,
        value: 'true'
    },
    date: Date,
    likes:{
        type: Number,
        required: false,
    },
    dislikes:{
        type: Number,
        required: false,
    },
    views:{
        type: Number,
        required: false,
    },

});

// autoIncrement.initialize(mongoose.connection);
// productSchema.plugin(autoIncrement.plugin, 'product');

const userproductmodel = mongoose.model('userproduct', userproductSchema);

export default userproductmodel;