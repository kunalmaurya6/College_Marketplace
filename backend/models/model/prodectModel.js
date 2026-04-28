import mongoose from "mongoose";
import { Schema,model } from "mongoose";
// import 

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: [100, "Title cannot exceed 100 characters"]
    },

    category: {
        type: String,
        required: true,
        enum: {
            values: ["electronics", "fashion", "books", "homedecor"],
            message: "Category must be one of electronics, fashion, books, home"
        }
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: [
            {
                image_url: {
                    type: String,
                    required: true,
                },
                image_key: {
                    type: String,
                    required: true,
                },
            }
        ],
        required: true,
        validate: [
            (val) => Array.isArray(val) && val.length > 0 && val.length < 5,
            "You must provide 1 to 4 images"
        ]
    },

    price: {
        type: Number,
        min: 5,
        max: 5000,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    saleStatus: {
        type: String,
        enum: ["available", "sold"],
        default: "available"
    },
    seller: {
        type:Schema.Types.ObjectId,
        ref: 'roleModel'
    }
}, { timestamps: true });

const productModel = model('product', productSchema);

export default productModel;