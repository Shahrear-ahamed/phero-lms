const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new Schema(
  {
    userId: { type: ObjectId, ref: "User" },
    cartList: [
      {
        title: { type: String, required: true },
        // image: { type: String, required: false },
        price: { type: Number, required: false },
        courseId: { type: ObjectId, ref: "Course", required: true },
      },
    ],
  },
  { timestamps: true }
);

const cart = model("Cart", cartSchema);
module.exports = cart;
