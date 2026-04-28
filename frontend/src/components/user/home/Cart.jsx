import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { getCartProducts, removeProductFromCart } from "../../../utils/cart";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState("");

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCartProducts();
      setProducts(data.products || []);
    } catch (error) {
      toast.error(error.message || "Unable to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = useMemo(() => {
    return products.reduce((sum, product) => sum + Number(product?.price || 0), 0);
  }, [products]);

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);
      await removeProductFromCart(productId);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product._id !== productId)
      );
      toast.success("Removed from cart");
    } catch (error) {
      toast.error(error.message || "Unable to remove item");
    } finally {
      setRemovingId("");
    }
  };

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 py-10">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>
          <p className="mt-4 text-sm font-semibold text-gray-500">Loading cart...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-gray-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">My Cart</h1>
          <p className="mt-1 text-sm text-gray-500">Products saved for your next campus pickup.</p>
        </div>
        <p className="text-lg font-extrabold text-blue-600">&#8377;{total.toLocaleString("en-IN")}</p>
      </div>

      {products.length === 0 ? (
        <div className="flex min-h-[360px] items-center justify-center text-center">
          <div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-950">Your cart is empty</h2>
            <p className="mt-2 text-sm text-gray-500">Add a product from the product details page.</p>
            <NavLink to="/" className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Browse Products
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {products.map((product) => {
            const productId = product?._id;
            const imageUrl = product?.image?.[0]?.image_url;

            return (
              <article key={productId} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                <NavLink to={`/product?id=${productId}`} className="flex flex-1 gap-4">
                  {imageUrl ? (
                    <img src={imageUrl} alt={product?.title || "Product"} className="h-24 w-24 shrink-0 rounded-lg bg-gray-100 object-cover" />
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl text-gray-400">
                      <i className="fa-regular fa-image"></i>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-gray-950">{product?.title || "Untitled product"}</p>
                    <p className="mt-1 text-sm capitalize text-gray-500">{product?.category || "Campus item"}</p>
                    <p className="mt-3 text-xl font-extrabold text-blue-600">&#8377;{Number(product?.price || 0).toLocaleString("en-IN")}</p>
                  </div>
                </NavLink>

                <button
                  type="button"
                  onClick={() => handleRemove(productId)}
                  disabled={removingId === productId}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-red-100 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <i className="fa-regular fa-trash-can"></i>
                  {removingId === productId ? "Removing..." : "Remove"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Cart;
