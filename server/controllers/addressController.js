import Address from "../models/address.js";



//add
export const addAdress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address } = req.body;
    await Address.create({ ...address, userId });
    res.json({ success: true, message: "Address added" })
  } catch (error) {
    console.log("***")

    res.json({ success: false, message: error.message })
  }
}


//get

export const getAddress = async (req , res)=>{
  try{

    const userId = req.userId;
    const addresses = await Address.find({ userId });
    res.json({ success: true, addresses})

  }catch(error){
  console.log(error.message)

    res.json({ success: false, message: error.message })
  }
}