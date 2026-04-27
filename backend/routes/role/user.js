import express from 'express';
import productModel from '../../models/model/prodectModel.js';
import mongoose from 'mongoose';

const user = express.Router();

//all products
user.get('/products', async (req, res) => {
    try {
        const limit = 10;
        const cursor = req.query.cursor;

        let query = { status: "approved" };
        const saleStatus = req.query.saleStatus || "available";

        if (saleStatus === "available") {
            query.$or = [
                { saleStatus: "available" },
                { saleStatus: { $exists: false } }
            ];
        } else if (saleStatus !== "all") {
            query.saleStatus = saleStatus;
        }

        if (cursor) {
            query._id = { $lt: cursor };
        }

        const products = await productModel.find(query)
            .sort({ createdAt: -1 })
            .limit(limit);

        if (!products) {
            return res.status(404).json({ message: "No product has approved" });
        }

        res.status(200).json({
            products,
            nextCursor: products.length ? products[products.length - 1]._id : null
        });
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
})

//single product by id
user.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const data = await productModel.findById(id);

        if (!data) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
})

//all seller
user.get('/seller', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const data = await productModel.findById(id);

        if (!data) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
})

//seller products by seller id
user.get('/seller/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const data = await productModel.findById(id);

        if (!data) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
})

export default user;
