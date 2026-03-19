import express from 'express';
import productModel from '../models/model/prodect.js';
import mongoose from 'mongoose';
import upload from '../uploads/upload.js';
import { uploadToCloudinary } from '../utils/cloudUpload.js';
import cloudinary from "../uploads/cloudinary.js";

const route = express.Router();

{/*<form action="/stats" enctype="multipart/form-data" method="post">
  <div class="form-group">
    <input type="file" class="form-control-file" name="product_image">
    <input type="text" class="form-control" placeholder="Number of speakers" name="nspeakers">
    <input type="submit" value="Get me the stats!" class="btn btn-default">
  </div>
</form>*/}

route.post('/product', upload.array('product_image', 2), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }
        // upload all files
        const uploads = req.files.map(file =>
            uploadToCloudinary(file.buffer)
        );
        const results = await Promise.all(uploads);

        // extract useful data
        const images = results.map(r => (
            {
                image_url: r.secure_url,
                image_key: r.public_id
            }
        )
        );
        const data = req.body;
        data.image = images;
        const response = await productModel(data);

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

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const publicIds = product.image.map(img => img.image_key);

        if (publicIds.length > 0) {
            await Promise.all(
                publicIds.map(id => cloudinary.uploader.destroy(id))
            );
        }

        await productModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Product and images deleted successfully",
        });

    } catch (e) {
        res.status(500).json({
            message: "Server error",
            error: e.message,
        });
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

route.get('/product', async (req, res) => {
    try {
        const allProducts = await productModel.find({});

        if (!allProducts) {
            return res.status(404).json({ message: "user has no published product" });
        }

        res.status(200).json({ allProducts });
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
})

export default route;