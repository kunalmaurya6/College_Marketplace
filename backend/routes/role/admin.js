import express from 'express';
import productModel from '../../models/model/prodectModel.js';
import mongoose from 'mongoose';
import deleteProduct from '../../utils/uploads/delete.js';

const admin = express.Router();

admin.get('/', async (req, res) => {
    try {
        const findByStatus = req.query.status;

        let filter = {};

        if (findByStatus !== undefined) {
            filter.status = findByStatus;
        }

        if (req.query.saleStatus !== undefined) {
            filter.saleStatus = req.query.saleStatus;
        }

        const allProducts = await productModel.find(filter).sort({ createdAt: -1 });

        if (!allProducts) {
            return res.status(404).json({ message: "user has no published product" });
        }

        res.status(200).json({ allProducts });
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
})

admin.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await deleteProduct(product);
        await productModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Product deleted successfully",
        });

    } catch (e) {
        res.status(500).json({
            message: "Server error",
            error: e.message,
        });
    }
});

admin.patch('/:id/sale-status', async (req, res) => {
    try {
        const { id } = req.params;
        const { saleStatus } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        if (!["available", "sold"].includes(saleStatus)) {
            return res.status(400).json({ message: "saleStatus must be available or sold" });
        }

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.saleStatus = saleStatus;
        await product.save();

        res.status(200).json({
            message: `Product marked as ${saleStatus}`,
            product
        });
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
});

admin.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const newStatus=req.body.status;
        if(!newStatus){
            return res.status(404).json({ message: "New status not found" });
        }
        product.status=newStatus;
        await product.save();

        res.status(200).json({
            message: "Status updated successfully",
            product
        });

    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
});

export default admin;
