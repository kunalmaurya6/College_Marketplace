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

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            maxlength: [20, "Name cannot exceed 20 characters"],
            unique:true
        },

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
            enum: ["user", "admin"],
            default: "user",
        }

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

const userModel = model('user', userSchema);

export default userModel;
