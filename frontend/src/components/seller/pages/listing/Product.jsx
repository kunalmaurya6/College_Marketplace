import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../api/server";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-200 text-black-500",
};

const saleStatusStyles = {
  available: "bg-blue-100 text-blue-700",
  sold: "bg-gray-200 text-gray-700",
};

const Product = (propes) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [updatingProductId, setUpdatingProductId] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchData("/sell/products");
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
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

  if(!filteredProducts || filteredProducts.length === 0) {
    return(
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full overflow-x-auto rounded-lg bg-white shadow-sm">
      <table className="min-w-[900px] w-full border-collapse">
        <thead className="sticky top-0 rounded-lg bg-gray-100 text-left text-sm text-gray-500">
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4">Price</th>
            <th className="p-4">Status</th>
            <th className="p-4">Sale</th>
            <th className="p-4">Actions</th>
            <th className="p-4">Remove</th>
          </tr>
        </thead>

        <tbody className=" w-full h-full">
          {filteredProducts.map((item) => (
            <tr key={item._id} className="border-t border-gray-200 shadow-sm hover:bg-gray-50">
              {/* Product */}
              <td className="flex items-center gap-3 p-4">
                <img
                  src={item.image[0].image_url}
                  alt={item.category}
                  className="h-16 w-16 rounded-md border border-gray-300 bg-gray-100 object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </td>

              {/* Price */}
              <td className="p-4 text-gray-700">{item.price}₹</td>

              {/* Status */}
              <td className="p-4">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${statusStyles[item.status]}`}
                >
                  {item.status}
                </span>
              </td>

              {/* Sale Status */}
              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${saleStatusStyles[item.saleStatus || "available"]}`}
                >
                  {item.saleStatus || "available"}
                </span>
              </td>

              {/* Actions */}
              <td className="p-4">
                <button
                  type="button"
                  onClick={() => handleSaleStatus(item)}
                  disabled={updatingProductId === item._id}
                  className="rounded-md border px-3 py-1 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updatingProductId === item._id
                    ? "Updating..."
                    : item.saleStatus === "sold"
                      ? "Mark Available"
                      : "Mark Sold"}
                </button>
              </td>

              {/* delete */}
              <td className="p-4">
                <button className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
