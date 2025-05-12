import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import multer from 'multer';

import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { upload } from './configs/multer.js';
const app = express();
const port = process.env.PORT || 3000;

// Connect to DB and Cloudinary
(async () => {
  await connectDB();
  await connectCloudinary();
})();

// Middleware
const allowedOrigins = ['https://gogreen-frontend.onrender.com'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// Listen
app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
