import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2.5 h-10 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

function AddAddress() {
  const {axios , navigate, user} = useAppContext();
  const [address, setAddress] = useState({
    
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
     try {
      const { data } = await axios.post("/api/address/add",  {address} );
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  useEffect(()=>{
 if(!user){
    navigate('/cart');
 }
  } , []);
  return (
    <div className="m-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>{" "}
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form className="space-y-3 mt-6 text-sm" onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
             handleChange={handleChange}
              type="email"
              placeholder="Enter email"
              
              name="email"
              address={address}
            />
            <InputField
              type="text"
              placeholder="Enter Street"
             handleChange={handleChange}
              name="street"
              address={address}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                placeholder="Enter City"
               handleChange={handleChange}
                name="city"
                address={address}
              />
              <InputField
                type="text"
                placeholder="Enter State"
                 handleChange={handleChange}
                name="state"
                address={address}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                placeholder="Enter ZipCode"
               handleChange={handleChange}
                name="zipcode"
                address={address}
              />
              <InputField
                type="text"
                placeholder="Enter Country"
               handleChange={handleChange}
                name="country"
                address={address}
              />
            </div>
   <InputField
                type="text"
                placeholder="Enter Phone Number"
                handleChange={handleChange}
                name="phone"
                address={address}
              />

              <button  className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull/75 transition cursor-pointer uppercase">Submit Address</button>

          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="Address"
        />
      </div>
    </div>
  );
}

export default AddAddress;
