const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new Schema({
  cartList: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: false },
      courseId: { type: ObjectId, ref: "Course", required: true },
    },
  ],
  transaction_id: { type: String, unique: true },
  user: {
    type: ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  address: {
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postcode: Number,
    country: String,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Complete"],
  },
  sessionKey: String,
});

const order = model("Order", orderSchema);
module.exports = order;
