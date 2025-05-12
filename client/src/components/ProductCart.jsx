
import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCart = ({ product }) => {
  const {
    currency,
    UpdateCardItem,
    cartItems,
    Removefromcard,
    navigate,
    AddtoCard,
  } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="border border-gray-300 rounded-md p-3 bg-white w-full max-w-[240px] sm:max-w-[280px] md:max-w-[224px] cursor-pointer"
      >
        {/* Image Container */}
        <div className="flex items-center justify-center mb-2">
          <img
            className="transition-transform duration-200 ease-in-out transform hover:scale-105 max-h-28 sm:max-h-36 object-contain"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="text-gray-600 text-xs sm:text-sm space-y-1">
          <p className="capitalize">{product.category}</p>
          <p className="text-gray-800 font-semibold text-sm sm:text-base truncate">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-3 sm:w-4"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                />
              ))}
            <p className="text-[10px] sm:text-xs">(4)</p>
          </div>

          {/* Price and Cart Button */}
          <div className="flex items-end justify-between mt-3">
            <p className="text-base sm:text-lg font-medium text-primary">
              {currency}{product.offerPrice}{" "}
              <span className="text-gray-400 text-xs sm:text-sm line-through">
                {product.price}
              </span>
            </p>

            {/* Add/Remove Button */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-primary"
            >
              {!cartItems[product._id] ? (
                <button
                  onClick={() => AddtoCard(product._id)}
                  className="flex items-center justify-center gap-1 border border-primary bg-indigo-100 rounded px-2 py-1 text-xs sm:text-sm"
                >
                  <img
                    src={assets.cart_icon}
                    alt="cart_icon"
                    className="w-4 h-4"
                  />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-primary/60 rounded px-2 py-1 text-white text-xs sm:text-sm">
                  <button
                    onClick={() => Removefromcard(product._id)}
                    className="px-2"
                  >
                    -
                  </button>
                  <span>{cartItems[product._id]}</span>
                  <button
                    onClick={() => AddtoCard(product._id)}
                    className="px-2"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCart;
