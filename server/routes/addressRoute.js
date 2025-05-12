import express from "express";
import { addAdress, getAddress } from "../controllers/addressController.js";
import authUser from "../middlerwares/authUser.js";
const addressRouter = express.Router();

addressRouter.post("/add",authUser , addAdress)
addressRouter.get("/get" ,authUser, getAddress)

export default addressRouter;