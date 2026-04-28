import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchData } from "../../../../api/server";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-red-50 text-red-700 ring-red-200",
};

const saleStatusStyles = {
  available: "bg-blue-50 text-blue-700 ring-blue-200",
  sold: "bg-gray-100 text-gray-700 ring-gray-200",
};

const statusLabels = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const saleStatusLabels = {
  available: "Available",
  sold: "Sold",
};

const Product = (propes) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [updatingProductId, setUpdatingProductId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchData("/sell/products");
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message || "Unable to load listings.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (propes.order === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.status === propes.order));
    }
  }, [products, propes.order]);

  // console.log(products);

  const handleSaleStatus = async (product) => {
    const nextSaleStatus = product.saleStatus === "sold" ? "available" : "sold";
    setUpdatingProductId(product._id);

    try {
      const data = await fetchData(`/sell/${product._id}/sale-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ saleStatus: nextSaleStatus }),
      });

      setProducts((currentProducts) =>
        currentProducts.map((item) =>
          item._id === product._id ? data.product : item
        )
      );
    } catch (error) {
      console.error("Error updating sale status:", error);
    } finally {
      setUpdatingProductId("");
    }
  };

  const getImageUrl = (product) => product?.image?.[0]?.image_url;
  const getPrice = (price) => Number(price || 0).toLocaleString("en-IN");
  const getStatusClass = (status) => statusStyles[status] || "bg-gray-100 text-gray-700 ring-gray-200";
  const getSaleStatusClass = (status) => saleStatusStyles[status || "available"] || saleStatusStyles.available;

  if (loading) {
    return (
      <div className="flex h-full min-h-[360px] w-full items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="text-center">
          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>
          <p className="mt-4 text-sm font-semibold text-gray-600">Loading listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[360px] w-full items-center justify-center rounded-xl border border-red-100 bg-white p-6 shadow-sm">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
            <i className="fa-regular fa-circle-xmark"></i>
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-950">Could not load listings</h2>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if(!filteredProducts || filteredProducts.length === 0) {
    return(
      <div className="flex h-full min-h-[360px] w-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-6">
        <div className="max-w-sm text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">
            <i className="fa-solid fa-box-open"></i>
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-950">No listings found</h2>
          <p className="mt-2 text-sm text-gray-500">Try another status filter or add a new product to your seller account.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full min-h-0 w-full overflow-hidden">
      <div className="hidden h-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm md:block" style={{ scrollbarWidth: "none" }}>
      <table className="min-w-[900px] w-full border-collapse">
        <thead className="sticky top-0 bg-gray-50 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-5 py-4">Product</th>
            <th className="px-5 py-4">Price</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Sale</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {filteredProducts.map((item) => (
            <tr key={item._id} className="transition hover:bg-blue-50/40">
              {/* Product */}
              <td className="px-5 py-4">
                <NavLink
                  to="/product"
                  state={{ productId: item._id, isSeller: true }}
                  className="group flex w-fit max-w-md items-center gap-4 rounded-md transition"
                >
                  {getImageUrl(item) ? (
                    <img
                      src={getImageUrl(item)}
                      alt={item.category}
                      className="h-16 w-16 rounded-lg border border-gray-200 bg-gray-100 object-cover transition group-hover:border-blue-200"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-xl text-gray-400">
                      <i className="fa-regular fa-image"></i>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900 transition group-hover:text-blue-700">{item.title}</p>
                    <p className="mt-1 text-sm capitalize text-gray-500">{item.category || "Uncategorized"}</p>
                  </div>
                </NavLink>
              </td>

              {/* Price */}
              <td className="px-5 py-4 text-sm font-bold text-gray-900">&#8377;{getPrice(item.price)}</td>

              {/* Status */}
              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ring-inset ${getStatusClass(item.status)}`}
                >
                  {statusLabels[item.status] || item.status || "Listed"}
                </span>
              </td>

              {/* Sale Status */}
              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${getSaleStatusClass(item.saleStatus)}`}
                >
                  {saleStatusLabels[item.saleStatus || "available"]}
                </span>
              </td>

              {/* Actions */}
              <td className="px-5 py-4">
                <div className="flex flex-wrap justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaleStatus(item)}
                    disabled={updatingProductId === item._id}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <i className={item.saleStatus === "sold" ? "fa-solid fa-rotate-left" : "fa-solid fa-check"}></i>
                    {updatingProductId === item._id
                      ? "Updating..."
                      : item.saleStatus === "sold"
                        ? "Mark Available"
                        : "Mark Sold"}
                  </button>
                  <NavLink
                    to="/seller/product"
                    state={{ productId: item._id, isSeller: true }}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                    Edit
                  </NavLink>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="grid h-full gap-4 overflow-auto md:hidden" style={{ scrollbarWidth: "none" }}>
        {filteredProducts.map((item) => (
          <article key={item._id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <NavLink
              to="/product"
              state={{ productId: item._id, isSeller: true }}
              className="flex gap-4"
            >
              {getImageUrl(item) ? (
                <img
                  src={getImageUrl(item)}
                  alt={item.category}
                  className="h-20 w-20 shrink-0 rounded-lg border border-gray-200 bg-gray-100 object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-xl text-gray-400">
                  <i className="fa-regular fa-image"></i>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-950">{item.title}</p>
                <p className="mt-1 text-sm capitalize text-gray-500">{item.category || "Uncategorized"}</p>
                <p className="mt-2 text-lg font-extrabold text-blue-600">&#8377;{getPrice(item.price)}</p>
              </div>
            </NavLink>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ring-inset ${getStatusClass(item.status)}`}>
                {statusLabels[item.status] || item.status || "Listed"}
              </span>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${getSaleStatusClass(item.saleStatus)}`}>
                {saleStatusLabels[item.saleStatus || "available"]}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSaleStatus(item)}
                disabled={updatingProductId === item._id}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <i className={item.saleStatus === "sold" ? "fa-solid fa-rotate-left" : "fa-solid fa-check"}></i>
                {updatingProductId === item._id
                  ? "Updating..."
                  : item.saleStatus === "sold"
                    ? "Available"
                    : "Sold"}
              </button>
              <NavLink
                to="/seller/product"
                state={{ productId: item._id, isSeller: true }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <i className="fa-regular fa-pen-to-square"></i>
                Edit
              </NavLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Product;
