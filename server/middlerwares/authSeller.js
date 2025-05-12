import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  
  if (!sellerToken) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {

    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenDecode.email === process.env.SELLER_EMAIL) {
     return next();
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }

    
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error Occured" });
  }

}

export default authSeller;