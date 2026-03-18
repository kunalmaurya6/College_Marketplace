import express from 'express';
import productModel from '../models/model/prodect.js';
import mongoose from 'mongoose';

const route = express.Router();

route.get('/hello', (req, res) => {
    res.send("Hello");
})

route.post('/product', async (req, res) => {
    try {
        const response = await productModel(req.body);
        await response.save();
        res.status(201).json({
            message: "Product added successfully",
            data: response
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
})

route.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Validate format first to avoid CastError
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const dataDeletion = await productModel.findByIdAndDelete(id);

        // 2. Check if the product actually existed
        if (!dataDeletion) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(204).json({ message: "Product deleted successfully" });
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
})

route.patch('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const updation = await productModel.findByIdAndUpdate(id, update);

        if (!updation) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully" });
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
})

route.get('/product/:id', async (req, res) => {
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

export default route;