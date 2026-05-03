import express from "express";
import mongoose from "mongoose";
import cartModel from "../../models/model/cartModel.js";
import productModel from "../../models/model/prodectModel.js";
import requireAuth from "../auth/authMiddleware.js";

const cart = express.Router();
cart.use(requireAuth);

cart.get("/", async (req, res) => {
    try {
        const items = await cartModel
            .find({ user: req.user._id })
            .populate("product")
            .sort({ createdAt: -1 });

        const products = items
            .map((item) => item.product)
            .filter(Boolean);

        res.status(200).json({ items, products, count: products.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

cart.post("/", async (req, res) => {
    try {
        const { productId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const item = await cartModel.findOneAndUpdate(
            { user: req.user._id, product: productId },
            { user: req.user._id, sessionId: String(req.user._id), product: productId },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).populate("product");

        const count = await cartModel.countDocuments({ user: req.user._id });

        res.status(200).json({
            message: "Product added to cart",
            item,
            count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

cart.delete("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        await cartModel.findOneAndDelete({ user: req.user._id, product: productId });

        const count = await cartModel.countDocuments({ user: req.user._id });

        res.status(200).json({
            message: "Product removed from cart",
            count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default cart;
