import React, { useEffect, useState } from "react";
import Card from "./Card";
import { fetchData } from "../../../../api/server";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchData("/products");
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
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
