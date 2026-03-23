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
            (val) => Array.isArray(val) && val.length > 0 && val.length <= 2,
            "You must provide 1 to 2 images"
        ]
    },

    price: {
        type: Number,
        min: 10,
        max: 5000,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
}, { timestamps: true });

const productModel = mongoose.model('product', productSchema);

export default productModel;