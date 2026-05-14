import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./components/Categories";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { AppContext, useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import Allproducts from "./pages/Allproducts";
import Category from "./pages/Category";
import Productdetails from "./pages/Productdetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProducts from "./pages/seller/AddProducts";
import Orders from "./pages/seller/Orders";
import ProductList from "./pages/seller/ProductList";
import NoPageFound from "./pages/NoPageFound";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");

  const { ShowUserlogin, isSeller } = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? <Navbar /> : <Navbar />}

      {ShowUserlogin ? <Login /> : null}

      <Toaster />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Allproducts />} />
          <Route path="/products/:category" element={<Category />} />
          <Route path="/products/:category/:id" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProducts /> : null} />
            <Route path="orders" index element={isSeller ? <Orders /> : null} />
            <Route
              path="product-list"
              index
              element={isSeller ? <ProductList /> : null}
            />
          </Route>
           <Route path="*" element={<NoPageFound/>} />
          
        </Routes>
        
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
