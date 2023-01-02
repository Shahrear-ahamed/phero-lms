const Cart = require("../models/Cart");

const cartServices = {};

cartServices.addToCartService = async (userId, cartDetails) => {
  const updateCart = await Cart.updateOne(
    { userId, "cartList.courseId": { $ne: cartDetails?.courseId } },
    { $push: { cartList: cartDetails } }
  );
  return updateCart;
};

cartServices.getCartdetails = async (userId) => {
  const cart = await Cart.findOne({ userId })
    .populate({
      path: "cartList.courseId",
      select: "title thumbnail price",
    })
    .select("userId cartList");
  
  return cart;
};

cartServices.deleteCartitemService = async (userId, id) => {
  const deleteCartList = await Cart.updateOne(
    { userId },
    { $pull: { cartList: { courseId: id } } }
  );
  return deleteCartList;
};

module.exports = cartServices;
