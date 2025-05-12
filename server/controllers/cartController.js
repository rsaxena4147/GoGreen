import User from "../models/User.js";






export const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const {  cartItems } = req.body;
    let r = await User.findByIdAndUpdate(userId, { cartItems })
    return res.json({ success: true, message: "cart Update !!" })
  } catch (error) {
    console.log(error.message)
    return res.json({ success: false, message: error.message })
  }
}