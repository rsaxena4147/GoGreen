import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isSeller, setIsSeller] = useState(false);
  const [ShowUserlogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setsearchQuery] = useState({});

  //fet seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");

      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
        
      }
    } catch (e) {
      setIsSeller(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      } else {
        setUser(null);
           toast("Please login!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, []);

  useEffect(() => {
 
  const updateCart = async () => { 
    try {
      const { data } = await axios.post("/api/cart/update", {  userId: user._id,  cartItems });
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
    if (user) {
      updateCart();
    }
   
  }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const AddtoCard = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId]++;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added To Card");
  };

  const UpdateCardItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const Removefromcard = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId]--;

      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Removed from Cart");
  };
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    ShowUserlogin,
    setShowUserLogin,
    products,
    currency,
    UpdateCardItem,
    Removefromcard,
    cartItems,
    AddtoCard,
    searchQuery,
    setsearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
    fetchUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
