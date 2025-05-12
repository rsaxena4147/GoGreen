// import { useAppContext } from '../../context/AppContext';
// import { assets, dummyOrders } from '../../assets/assets';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const Orders = () => {
//    const {currency} = useAppContext();
//    const [orders , setOrders] = useState([]);

//    const fetchOrders = async () =>{
//       try {
//         const {data} = await axios.get('/api/order/seller');
//         if(data.success){
//         setOrders(data.orders);

//         }else{
//             toast.error(data.message);
//         }

//       } catch (error) {
//        toast.error(error.message);
//       }
//    } 
//    useEffect(()=>{
//     fetchOrders();
//    },[])
//     return (
//       <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
//         <div className="md:p-10 p-4 space-y-4">
//             <h2 className="text-lg font-medium">Orders List</h2>
//             {orders.map((order, index) => (
//                 <div key={index} className="flex flex-col md:items-center md:flex-row gap-5 p-5 justify-between max-w-4xl rounded-md border border-gray-300">
//                     <div className="flex gap-5 max-w-80">
//                         <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
//                         <div >
//                             {order.items.map((item, index) => (
//                                 <div key={index} className="flex flex-col ">
//                                     <p className="font-medium">
//                                         {item.product.name}{" "} <span className={`text-primary`}>x {item.quantity}</span>
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="text-sm md:text-base text-black/60">
//                         <p className='text-black/80'>{" "}{order.address.firstName} {order.address.lastName}</p>
//                         <p>{order.address.street}, {order.address.city}</p>
//                          <p> {order.address.state},{order.address.zipcode}, {order.address.country}</p>

//                          <p></p>
//                          <p>{order.address.phone}</p>
//                     </div>

//                     <p className="font-medium text-large my-auto text-black/70">{currency}{order.amount}</p>

//                     <div className="flex flex-col text-sm md:text-base text-black/60">
//                         <p>Method: {order.paymentType}</p>
//                         <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                         <p>Payment: {order.isPaid === true ? "Paid" : "Pending"}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//         </div>
//     );
// };

// export default Orders


import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-auto bg-gray-50">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Orders List</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No orders found.</p>
        ) : (
          orders.map((order, index) => (

            <div
  key={index}
  className="flex flex-wrap md:flex-nowrap justify-between gap-4 p-5 border border-gray-200 rounded-xl bg-white shadow-md"
>
  {/* Product Info */}
  <div className="flex gap-4 min-w-[200px]">
    <img className="w-12 h-12 object-contain" src={assets.box_icon} alt="box" />
    <div>
      {order.items.map((item, i) => (
        <p key={i} className="text-sm text-gray-800">
          <span className="font-semibold">{item.product.name}</span>{' '}
          <span className="text-green-600">x {item.quantity}</span>
        </p>
      ))}
    </div>
  </div>

  {/* Address */}
  <div className="text-sm text-gray-700 min-w-[180px]">
    <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
    <p>{order.address.street}, {order.address.city}</p>
    <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
    <p>{order.address.phone}</p>
  </div>

  {/* Amount */}
  <div className="font-semibold text-black text-base min-w-[60px]">
    {currency}{order.amount}
  </div>

  {/* Status */}
  <div className="text-sm text-gray-600 min-w-[150px]">
    <p><span className="font-medium">Method:</span> {order.paymentType}</p>
    <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
    <p>
      <span className="font-medium">Payment:</span>{' '}
      {order.isPaid ? (
        <span className="text-green-600 font-semibold">Paid</span>
      ) : (
        <span className="text-red-500 font-semibold">Pending</span>
      )}
    </p>
  </div>
</div>

           ))
        )}
      </div>
    </div>
  );
};

export default Orders;
