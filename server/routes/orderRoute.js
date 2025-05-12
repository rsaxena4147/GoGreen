import express from 'express';
import authUser from '../middlerwares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/orderController.js';
import authSeller from '../middlerwares/authSeller.js';
const orderRouter = express.Router();

orderRouter.post('/cod', authUser , placeOrderCOD);
orderRouter.get('/user',authUser , getUserOrders)
orderRouter.get('/seller',authSeller , getAllOrders)

export default orderRouter