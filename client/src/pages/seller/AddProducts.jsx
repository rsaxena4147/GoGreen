import React, { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProducts = () => {
  const { axios , fetchProducts  } = useAppContext();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
 

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const productData = {
        name,
        description: description.split('\n'),
        category,
        price,
        offerPrice,
        inStock : true
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post('/api/product/add' , formData)

      if (data.success) {
        toast.success(data.message);
        setName("");
        setCategory("");
        setDescription("");
        setOfferPrice("");
        setPrice("");
        setFiles([]);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);

      console.log(error.message);
    }
  };
  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-6 w-full max-w-2xl mx-auto"
      >
        {/* Product Image */}
        <div>
          <p className="text-base font-semibold">Product Image</p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="w-28 h-28 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer overflow-hidden bg-gray-50 hover:shadow-md transition"
                >
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="add"
                    className="object-cover w-full h-full"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            id="product-name"
            type="text"
            value={name}
            placeholder="Type here"
            className="outline-none py-2 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            id="product-description"
            rows={4}
            value={description}
            className="outline-none py-2 px-4 rounded border border-gray-300 resize-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type here"
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            className="outline-none py-2 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            value={category}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.path}>
                {category.path}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Offer Price */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[150px] flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              id="product-price"
              type="number"
              value={price}
              placeholder="0"
              className="outline-none py-2 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex-1 min-w-[150px] flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              id="offer-price"
              type="number"
              placeholder="0"
              value={offerPrice}
              className="outline-none py-2 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer hover:bg-primary-dull transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
