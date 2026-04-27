import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { fetchData } from "../../api/server";
import { isFavoriteProduct, listenForFavoriteChanges, toggleFavoriteProduct } from "../../utils/favorites";

const ProductView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams.get("id");
  const seller = searchParams.get("by");
  const isSellerView = seller === "seller";
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setError("Product id is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await fetchData(`/product/${productId}`);
        setProduct(response?.data || null);
        setActiveImage(0);
      } catch (err) {
        setError(err.message || "Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  useEffect(() => {
    const updateFavoriteState = () => {
      setIsFavorite(isFavoriteProduct(productId));
    };

    updateFavoriteState();
    return listenForFavoriteChanges(updateFavoriteState);
  }, [productId]);

  const images = useMemo(() => {
    if (!Array.isArray(product?.image)) {
      return [];
    }

    return product.image
      .map((item) => item?.image_url)
      .filter(Boolean);
  }, [product]);

  const price = Number(product?.price || 0).toLocaleString("en-IN");
  const category = product?.category
    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
    : "Campus item";
  const listedDate = product?.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently listed";
  const sellerName =
    product?.seller?.userName ||
    product?.seller?.email?.split("@")?.[0] ||
    "Campus Seller";
  const handleFavorite = () => {
    setIsFavorite(toggleFavoriteProduct(product));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>
          <p className="mt-4 text-sm font-medium text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white px-4">
        <div className="max-w-md rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
            <i className="fa-regular fa-circle-xmark"></i>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Product not found</h1>
          <p className="mt-2 text-sm text-gray-500">{error || "This listing is unavailable."}</p>
          <NavLink
            to="/"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Back to Browse
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-blue-600 sm:text-base"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
            Back to Browse
          </button>

          <div className="flex items-center gap-3">
            <NavLink
              to="/seller/product"
              className="hidden items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 sm:inline-flex"
            >
              <i className="fa-solid fa-chart-line"></i>
              Selling
            </NavLink>

            <button
              type="button"
              onClick={handleFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Save listing"}
              className={`flex h-11 w-11 items-center justify-center rounded-full border bg-white text-lg transition hover:border-red-200 hover:bg-red-50 ${
                isFavorite ? "border-red-200 text-red-500" : "border-gray-200 text-gray-700 hover:text-red-500"
              }`}
            >
              <i className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}></i>
            </button>

            <NavLink
              to="/profile"
              aria-label="Profile"
              className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-700 transition hover:scale-105 hover:bg-blue-50 hover:text-blue-600"
            >
              <i className="fa-solid fa-user"></i>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-12 lg:px-8 lg:py-12">
        <section className="min-w-0">
          <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={product?.title || "Product"}
                className="h-full w-full object-contain p-4 sm:p-8"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-6xl text-gray-300">
                <i className="fa-regular fa-image"></i>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3 sm:flex sm:gap-4">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border bg-gray-100 transition sm:h-24 sm:w-24 ${
                    activeImage === index
                      ? "border-blue-600 ring-4 ring-blue-100"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
                  aria-label={`Show product image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {category}
            </span>
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              {product?.status === "approved" ? "Available" : product?.status || "Listed"}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
            {product?.title || "Untitled product"}
          </h1>

          <div className="mt-4 flex flex-wrap items-end gap-3">
            <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl">
              &#8377;{price}
            </p>
            <p className="pb-1 text-lg font-semibold text-gray-400 line-through">
              &#8377;{Number(product?.price || 0) + 410}
            </p>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            {product?.desc || "No description added by the seller yet."}
          </p>

          <div className="mt-7 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl font-bold text-blue-600">
                  {sellerName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold text-gray-900">{sellerName}</p>
                  <p className="text-sm text-gray-500">Verified campus seller</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-600">
                4.8
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-3 border-b border-gray-100 pb-6 text-sm font-medium text-gray-600 sm:text-base">
            <div className="flex items-center gap-3">
              <i className="fa-regular fa-calendar w-5 text-gray-400"></i>
              <span>{listedDate}</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-location-dot w-5 text-gray-400"></i>
              <span>Campus pickup or meet-up available</span>
            </div>
          </div>

          <div className={`mt-7 grid gap-4 ${isSellerView ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            <button
              type="button"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-blue-600 px-5 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              <i className="fa-regular fa-message"></i>
              Message Seller
            </button>
            <button
              type="button"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-emerald-600 px-5 text-base font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              Buy Now
            </button>
            {isSellerView && (
              <NavLink
                to={`/seller/product?id=${productId}`}
                className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-gray-900 px-5 text-base font-bold text-white shadow-lg shadow-gray-200 transition hover:bg-gray-800"
              >
                <i className="fa-regular fa-pen-to-square"></i>
                Edit
              </NavLink>
            )}
          </div>

          <div className="mt-7 flex gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-900">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl text-emerald-600">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <p className="font-bold">Secure Campus Marketplace Transaction</p>
              <p className="mt-1 text-sm text-emerald-800">
                Meet on campus, inspect the item, and verify details before paying.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductView
