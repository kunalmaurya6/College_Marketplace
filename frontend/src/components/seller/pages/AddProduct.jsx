import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const categories = ["electronics", "fashion", "books", "homedecor"];

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    price: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    let updated = [...images, ...files];
    if (updated.length > 2) {
      toast.error("Only 2 images allowed");
      updated = updated.slice(0, 2);
    }

    setImages(updated);
  };

  // remove
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((img) => {
        data.append("product_image", img);
      });

      await axios.post("/api/sell/product", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product uploaded 🚀");

      setTimeout(() => {
        navigate("/seller");
      }, 1500);

    } catch (err) {
      console.error(err);
      toast.error("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full w-full items-center justify-center bg-gray-50 px-4 py-6 sm:py-10">

      {/* CARD */}
      <div className="flex w-full max-w-xl flex-col rounded-2xl bg-white shadow-lg">

        {/* HEADER */}
        <div className="p-5 sm:p-6">
          <h2 className="text-center text-xl font-semibold text-gray-800 sm:text-2xl">
            Add New Product
          </h2>
        </div>

        {/* FORM (SCROLL ENABLED WHEN NEEDED) */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6" style={{scrollbarWidth:"none"}}
        >

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product title"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Description */}
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Price */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price ₹"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Upload */}
          <div>
            <label className="mb-2 block text-sm text-gray-600">
              Upload Images (max 2)
            </label>

            <label className="flex h-28 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 transition hover:bg-gray-50">
              <span className="text-gray-500">Click to upload</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* IMAGE PREVIEW (AUTO EXPAND + SCROLL WHEN NEEDED) */}
            <div className="mt-4 flex flex-wrap gap-3">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative h-[110px] w-[110px] overflow-hidden rounded-lg bg-gray-100"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="Product preview"
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-1 top-1 rounded bg-black px-2 text-xs text-white"
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
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
