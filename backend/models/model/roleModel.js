import mongoose, { Schema, model } from "mongoose";

// const imageSchema = new Schema(
//     {
//         image_url: {
//             type: String,
//             required: true,
//         },
//         image_key: {
//             type: String,
//             required: true,
//         },
//     },
//     { _id: false }
// );

const roleSchema = new Schema(
    {
        // userName: {
        //     type: String,
        //     required: true,
        //     maxlength: [20, "Name cannot exceed 20 characters"],
        //     unique:true
        // },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },

        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be at least 6 characters"],
            select: false, // do not return password by default
        },

        role: {
            type: String,
            required: true,
            enum: {
                values: ["seller", "user", "admin"],
                message: "Role must be one of seller, user, admin",
            }
        },

        // image: {
        //     type: [imageSchema],
        //     validate: [
        //         {
        //             validator: (val) => val.length === 1, // exactly one image
        //             message: "User must have exactly one image",
        //         },
        //     ],
        // },
    }
);

const roleModel = model('role', roleSchema);

export default roleModel;