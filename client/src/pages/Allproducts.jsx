import React, { useEffect, useState } from "react";
import { useAppContext, AppContext } from "../context/AppContext";

import ProductCart from "../components/ProductCart";
const Allproducts = () => {
  const { products, searchQuery } = useAppContext();

  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setfilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setfilteredProducts(products);
    }
  }, [products, searchQuery]);
  return (
    <div className=" mt-16 flex flex-col">
      <div>
        <p className="text-2xl font-medium uppercase">All products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
          {filteredProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCart key={index} product={product} />
            ))}
        </div>
      ) : (
        <div>
          {" "}
          <p className="mt-6 text-center text-gray-500">
            No products found for your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default Allproducts;
