import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Sold: "bg-gray-200 text-gray-600",
};

const Product = (propes) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = axios.get("/api/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  console.log(products);

  if(!products || products.length === 0) {
    return(
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid w-full grid-cols-1 gap-5 rounded-t-lg sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {
        products.map((product) => (
          <Card key={product._id || product.id || product.title} product={product} />
        ))
      }
    </div>
  );
};

export default Product;
