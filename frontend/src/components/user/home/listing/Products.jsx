import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import { fetchData } from "../../../../api/server";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = (searchParams.get("search") || "").trim().toLowerCase();

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

  // console.log(products);

  const filteredProducts = searchTerm
    ? products.filter((product) => {
        const searchableText = [
          product?.title,
          product?.desc,
          product?.description,
          product?.category,
          product?.condition,
          product?.status,
          product?.price,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchTerm);
      })
    : products;

  if(!products || products.length === 0) {
    return(
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    )
  }

  if(searchTerm && filteredProducts.length === 0) {
    return(
      <div className="flex w-full items-center justify-center rounded-lg border border-dashed border-gray-300 py-12">
        <p className="text-lg text-gray-500">No products found for "{searchParams.get("search")}".</p>
      </div>
    )
  }

  return (
    <div className="grid w-full grid-cols-1 gap-5 rounded-t-lg sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {
        filteredProducts.map((product) => (
          <Card key={product._id || product.id || product.title} product={product} />
        ))
      }
    </div>
  );
};

export default Product;
