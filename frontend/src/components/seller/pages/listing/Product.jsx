import React, { useEffect, useState } from "react";
import axios from "axios";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  sold: "bg-gray-200 text-gray-600",
};

const Product = (propes) => {
  const [products, setProducts] = useState("");

  useEffect(() => {
    const fetchProducts = axios.get("/api/sell/products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [propes.order]);

  console.log(products);

  if(!products || products.length === 0) {
    return(
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full overflow-x-auto rounded-lg bg-white shadow-sm">
      <table className="min-w-[760px] w-full border-collapse">
        <thead className="sticky top-0 rounded-lg bg-gray-100 text-left text-sm text-gray-500">
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4">Price</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
            <th className="p-4">Remove</th>
          </tr>
        </thead>

        <tbody className=" w-full h-full">
          {products.products.map((item) => (
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

              {/* Actions */}
              <td className="p-4">
                <button className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100">
                  Sold/Available
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
