import { Schema, model } from "mongoose";

const cartSchema = new Schema(
    {
        sessionId: {
            type: String,
            required: true,
            index: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },
    },
    { timestamps: true }
);

cartSchema.index({ sessionId: 1, product: 1 }, { unique: true });

const cartModel = model("cart", cartSchema);

export default cartModel;
