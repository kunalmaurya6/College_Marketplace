import express from 'express';
import productModel from '../../models/model/prodectModel.js';
import mongoose from 'mongoose';
import upload from '../../utils/uploads/upload.js';
import { uploadToCloudinary } from '../../utils/uploads/cloudUpload.js';
import deleteProduct from '../../utils/uploads/delete.js';
import validateProduct from '../../models/validation/productValidation.js';
// import serverChat from '../chat/serverChat.js'

const product = express.Router();

// product.use('/chat',serverChat);

//give all of the product by seller id

product.get('/products', async (req, res) => {
   try {
       const filter = {};

       if (req.query.saleStatus) {
           filter.saleStatus = req.query.saleStatus;
       }

       const products = await productModel.find(filter).sort({ createdAt: -1 });

       if (!products) {
           return res.status(404).json({ message: "user has no published product" });
       }

       res.status(200).json({ products });
   } catch (e) {
       res.status(500).json({ message: "Server error", error: e.message });
   }
})

{/*<form action="/stats" enctype="multipart/form-data" method="post">
  <div class="form-group">
    <input type="file" class="form-control-file" name="product_image">
    <input type="text" class="form-control" placeholder="Number of speakers" name="nspeakers">
    <input type="submit" value="Get me the stats!" class="btn btn-default">
  </div>
</form>*/}

product.post('/product', upload.array('product_image', 2), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Upload product image" });
        }

        const { error, value } = validateProduct.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: error.details.map(err => err.message)
            });
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

        value.image = images;
        value.status = "pending";
        value.saleStatus = "available";
        const response = await productModel(value);

        await response.save();

        res.status(201).json({
            message: "Product added successfully",
            data: response
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
})

product.delete('/:id', async (req, res) => {
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

product.patch('/:id/sale-status', async (req, res) => {
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

product.patch('/:id', upload.array('product_image', 2), async (req, res) => {
    try {
        const { id } = req.params;
        const files = req.files || [];

        if (!req.body && files.length < 1) {
            return res.status(400).json({ message: "No change data found" });
        }

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

        if (files && files.length > 0) {
            await deleteProduct(product);

            const uploads = req.files.map(file => uploadToCloudinary(file.buffer));
            const results = await Promise.all(uploads);

            product.image = results.map(r => ({
                image_url: r.secure_url,
                image_key: r.public_id
            }));
        }

        product.status = "pending";
        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
});

product.get('/:id', async (req, res) => {
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

export default product;
