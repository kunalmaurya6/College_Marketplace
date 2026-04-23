import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    price: "",
  });

  const [images, setImages] = useState([]);

  // handle text input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle images (max 2, no replace issue)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    let updatedImages = [...images, ...files];

    if (updatedImages.length > 2) {
      alert("Only 2 images allowed");
      updatedImages = updatedImages.slice(0, 2);
    }

    setImages(updatedImages);
  };

  // remove image
  const handleRemoveImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((img) => {
        data.append("product_image", img);
      });

      const res = await axios.post(
        "http://localhost:8080/api/product",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product uploaded!");
      console.log(res.data);

      // reset form
      // setFormData({
      //   title: "",
      //   desc: "",
      //   category: "",
      //   price: "",
      // });
      // setImages([]);

    } catch (err) {
      console.error(err);
      // alert("Upload failed");
    }
  };

  return (
    <div className="max-h-full flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="text-sm text-gray-600">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Write product details..."
              rows="4"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Electronics"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-600">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm text-gray-600">Upload Images (max 2)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-2"
              name="product_image"
            />

            {/* Preview */}
            <div className="flex gap-4 mt-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 border rounded-xl bg-gray-50 flex items-center justify-center"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="max-w-full max-h-full object-contain"
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Upload Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
