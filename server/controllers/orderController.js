


// /cod

import Order from "../models/order.js";
import Product from "../models/product.js";

export const placeOrderCOD = async (req, res) => {
  console.log("i run");
  try {
    let userId = req.userId || req.body.userId;
    let {  items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({
        success: false,
        message: "Please add address and items",
      });
    }

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({
          success: false,
          message: `Product not found with ID ${item.product}`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02); // 2% tax

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//user

export const getUserOrders = async (req , res) =>{
  try{
const userId = req.userId;
console.log(userId)
  const orders = await Order.find({userId , $or:[{paymentType : "COD"} , {isPaid: true}]}).populate("items.product address");

  res.json({success : true , orders})
  }catch(error){
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
  
}


export const getAllOrders = async (req , res) =>{
  try{

  const orders = await Order.find({ $or:[{paymentType : "COD"} , {isPaid: true}]}).populate("items.product address").sort({createdAT : -1});

  res.json({success : true , orders})
  }catch(error){
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

