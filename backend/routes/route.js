import express from 'express';
import productModel from '../models/model/prodect.js';
import mongoose from 'mongoose';
import upload from '../imageCloud/upload.js';
import { uploadToCloudinary } from '../utils/cloudUpload.js';
import deleteProduct from '../imageCloud/delete.js';

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

        await deleteProduct(product);
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
});

route.patch('/product/:id', upload.array('product_image', 2), async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updates = { ...req.body };
        delete updates.product_image;
        Object.assign(product, updates);

        if (req.files && req.files.length > 0) {
            await deleteProduct(product);

            const uploads = req.files.map(file => uploadToCloudinary(file.buffer));
            const results = await Promise.all(uploads);

            product.image = results.map(r => ({
                image_url: r.secure_url,
                image_key: r.public_id
            }));
        }

        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
});

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