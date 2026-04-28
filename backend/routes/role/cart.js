import express from "express";
import mongoose from "mongoose";
import cartModel from "../../models/model/cartModel.js";
import productModel from "../../models/model/prodectModel.js";

const cart = express.Router();

const getSessionId = (req) => req.headers["x-cart-session-id"] || req.body?.sessionId;

cart.get("/", async (req, res) => {
    try {
        const sessionId = getSessionId(req);

        if (!sessionId) {
            return res.status(400).json({ message: "Cart session is required" });
        }

        const items = await cartModel
            .find({ sessionId })
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
        const sessionId = getSessionId(req);
        const { productId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ message: "Cart session is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const item = await cartModel.findOneAndUpdate(
            { sessionId, product: productId },
            { sessionId, product: productId },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).populate("product");

        const count = await cartModel.countDocuments({ sessionId });

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
        const sessionId = getSessionId(req);
        const { productId } = req.params;

        if (!sessionId) {
            return res.status(400).json({ message: "Cart session is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        await cartModel.findOneAndDelete({ sessionId, product: productId });

        const count = await cartModel.countDocuments({ sessionId });

        res.status(200).json({
            message: "Product removed from cart",
            count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default cart;
