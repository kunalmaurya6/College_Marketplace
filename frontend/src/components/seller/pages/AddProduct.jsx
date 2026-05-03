import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchData } from "../../../api/server";

const categories = ["electronics", "fashion", "books", "homedecor"];

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const productId = location.state?.productId || searchParams.get("id");
  const isEditMode = Boolean(productId);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    price: "",
  });

  const [images, setImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEditMode);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        return;
      }

      try {
        setLoadingProduct(true);
        const response = await fetchData(`/sell/${productId}`);
        const product = response.data;

        setFormData({
          title: product?.title || "",
          desc: product?.desc || "",
          category: product?.category || "",
          price: product?.price || "",
        });
        setCurrentImages(Array.isArray(product?.image) ? product.image : []);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Unable to load product");
        navigate("/seller");
      } finally {
        setLoadingProduct(false);
      }
    };

    loadProduct();
  }, [productId, navigate]);

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
    e.target.value = "";
  };

  // remove
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDelete = async () => {
    if (!productId) {
      return;
    }

    try {
      setDeleting(true);
      await fetchData(`/sell/${productId}`, {
        method: "DELETE",
      });

      toast.success("Product deleted");
      navigate("/seller");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isEditMode && images.length === 0) {
        toast.error("Upload product image");
        return;
      }

      setLoading(true);
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((img) => {
        data.append("product_image", img);
      });

      await fetchData(isEditMode ? `/sell/${productId}` : "/sell/product", {
        method: isEditMode ? "PATCH" : "POST",
        body: data,
      });

      toast.success(isEditMode ? "Product updated" : "Product uploaded");

      setTimeout(() => {
        navigate("/seller");
      }, 1500);

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 w-full items-start justify-center overflow-y-auto bg-gray-50 px-4 py-6 sm:py-10" style={{ scrollbarWidth: "none" }}>

      {/* CARD */}
      <div className="flex w-full max-w-xl flex-col rounded-2xl bg-white shadow-lg">

        {/* HEADER */}
        <div className="p-5 sm:p-6">
          <h2 className="text-center text-xl font-semibold text-gray-800 sm:text-2xl">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>
        </div>

        {loadingProduct ? (
          <div className="flex min-h-[360px] items-center justify-center p-6">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-500"></div>
              <p className="mt-3 text-sm text-gray-500">Loading product...</p>
            </div>
          </div>
        ) : (
        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-5 p-5 sm:p-6"
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
              {isEditMode ? "Upload new images to replace current images (max 2)" : "Upload Images (max 2)"}
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
              {images.length === 0 && currentImages.map((img, index) => (
                <div
                  key={img.image_key || img.image_url || index}
                  className="relative h-[110px] w-[110px] overflow-hidden rounded-lg bg-gray-100"
                >
                  <img
                    src={img.image_url}
                    alt="Current product"
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute bottom-1 left-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    Current
                  </span>
                </div>
              ))}

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
            className={`sticky bottom-3 z-10 w-full rounded-lg py-3 text-white font-medium shadow-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (isEditMode ? "Updating..." : "Uploading...") : (isEditMode ? "Update Product" : "Upload Product")}
          </button>

          {isEditMode && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-red-700">Delete this product</p>
                  <p className="mt-1 text-sm text-red-600">This will permanently remove the listing.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              </div>

              {showDeleteConfirm && (
                <div className="mt-4 rounded-lg bg-white p-3">
                  <p className="text-sm font-medium text-gray-800">Are you sure you want to delete this product?</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deleting}
                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deleting ? "Deleting..." : "Confirm Delete"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={deleting}
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </form>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
