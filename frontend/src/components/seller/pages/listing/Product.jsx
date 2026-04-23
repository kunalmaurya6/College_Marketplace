import React, { useEffect, useState } from "react";
import axios from "axios";

// const products = [
//   {
//     id: 1,
//     name: "Chicken Textbook",
//     subtitle: "Hardcover · 3 days ago",
//     price: "$45",
//     status: "Pending",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 1,
//     name: "Chicken Textbook",
//     subtitle: "Hardcover · 3 days ago",
//     price: "$45",
//     status: "Pending",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 1,
//     name: "Chicken Textbook",
//     subtitle: "Hardcover · 3 days ago",
//     price: "$45",
//     status: "Pending",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 1,
//     name: "Chicken Textbook",
//     subtitle: "Hardcover · 3 days ago",
//     price: "$45",
//     status: "Pending",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 1,
//     name: "Chicken Textbook",
//     subtitle: "Hardcover · 3 days ago",
//     price: "$45",
//     status: "Pending",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 1,
//     name: "Chicken Textbook",
//     subtitle: "Hardcover · 3 days ago",
//     price: "$45",
//     status: "Pending",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 2,
//     name: "Dust Desk",
//     subtitle: "2nd buyer · 1 item ago",
//     price: "$120",
//     status: "Approved",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     name: "Wireless Mouse",
//     subtitle: "Last batch · 2 min ago",
//     price: "$25",
//     status: "Sold",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     name: "Wireless Mouse",
//     subtitle: "Last batch · 2 min ago",
//     price: "$25",
//     status: "Sold",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     name: "Wireless Mouse",
//     subtitle: "Last batch · 2 min ago",
//     price: "$25",
//     status: "Sold",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     name: "Wireless Mouse",
//     subtitle: "Last batch · 2 min ago",
//     price: "$25",
//     status: "Sold",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     name: "Wireless Mouse",
//     subtitle: "Last batch · 2 min ago",
//     price: "$25",
//     status: "Sold",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     name: "Wireless Mouse",
//     subtitle: "Last batch · 2 min ago",
//     price: "$25",
//     status: "Sold",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     name: "Wireless Mouse",
//     subtitle: "Last batch · 2 min ago",
//     price: "$25",
//     status: "Sold",
//     image: "https://via.placeholder.com/40",
//   },
// ];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Sold: "bg-gray-200 text-gray-600",
};

const Product = (propes) => {
  const [products, setProducts] = useState("");

  useEffect(() => {
    const fetchProducts = axios.get("http://localhost:8080/api/products")
      .then((response) => {
        setProducts(response.data);
        // console.log(response.data);
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
    <div className="w-full h-full overflow-auto rounded-t-lg">
      <table className="w-full border-collapse rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-left text-sm text-gray-500 sticky top-0 rounded-lg">
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4">Price</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody className=" w-full h-full">
          {products.products.map((item) => (
            <tr key={item._id} className="border-t border-gray-200 hover:bg-gray-50 shadow-sm rounded-lg">
              {/* Product */}
              <td className="p-4 flex items-center gap-3">
                <img
                  src={item.image[0].image_url}
                  alt={item.category}
                  className="w-15 h-15 rounded-md object-cover border border-gray-300 bg-gray-100"
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
                <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
                  Sold/Aviable
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
