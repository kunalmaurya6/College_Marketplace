import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        min:10,
        max:5000,
        required:true
    }
}, { timestamps: true });

const productModel=mongoose.model('product',productSchema);

export default productModel;