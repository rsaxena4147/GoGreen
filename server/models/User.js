import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartItems: { type: Object, default: {} , ref: 'products' },


}, { minimize: false })

const User = mongoose.model.user || mongoose.model('user', userSchema);

export default User;
