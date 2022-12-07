const { Schema, model } = require("mongoose");
const validator = require("validator");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new Schema(
  {
    user: {
      email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
      },
      id: { type: ObjectId, ref: "User" },
    },
    cartList: [
      {
        title: { type: String, required: true },
        // image: { type: String, required: false },
        // price: { type: Number, required: false },
        courseId: { type: ObjectId, ref: "Course" },
      },
    ],
  },
  { timestamps: true }
);

const cart = model("Cart", cartSchema);
module.exports = cart;
