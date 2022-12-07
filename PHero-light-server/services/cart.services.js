const Cart = require("../models/Cart");

const cartServices = {};

cartServices.addToCartService = async (email, cartDetails) => {
  const updateCart = await Cart.updateOne(
    { email },
    { $push: { cartList: cartDetails } }
  );
  return updateCart;
};

cartServices.getCartdetails = async (email) => {
  const cart = await Cart.findOne({ email })
    .populate("cartList[course]")
    .select("-_id cartList");
  return cart;
};

module.exports = cartServices;
