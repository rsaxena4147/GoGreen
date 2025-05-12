import React from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { Link, NavLink, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
const SellerLayout = () => {
  const { setIsSeller, axios , navigate} = useAppContext();

  const sidebarLinks = [
    { name: "AddProducts", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("api/seller/logout");
      
      if (data.success) {
        toast.success(data.message);
     
        navigate('/')
      }else{
        toast.error(data.message);
      }
         setIsSeller(false)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="cursor-pointer w-34 md:w-38"
          />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1 hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col bg-white">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                                ${
                                  isActive
                                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100/90 border-white text-p-700"
                                }`}
            >
              <img className="w-7 h-7" src={item.icon} alt="" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pt-0 px-4 pb-4 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
