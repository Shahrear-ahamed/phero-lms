const Cart = require("../models/Cart");

const cartServices = {};

cartServices.addToCartService = async (userId, cartDetails) => {
  const updateCart = await Cart.updateOne(
    { userId },
    { $push: { cartList: cartDetails } }
  );
  return updateCart;
};

cartServices.getCartdetails = async (userId) => {
  const cart = await Cart.findOne({ userId })
    // .populate({
    //   path: "cartList.courseId",
    //   select: "title courseList",
    // })
    .select("-_id userId cartList");
  return cart;
};

module.exports = cartServices;
