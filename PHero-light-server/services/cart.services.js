const Cart = require("../models/Cart");

const cartServices = {};

cartServices.addToCartService = async (email, cartDetails) => {
  console.log(cartDetails);
  const updateCart = await Cart.updateOne(
    { email },
    { $push: { cartList: cartDetails } }
  );
  return updateCart;
};

cartServices.getCartdetails = async (email) => {
  const cart = await Cart.findOne({ email })
    // .populate({
    //   path: "cartList.courseId",
    //   select: "title courseList",
    // })
    .select("-_id cartList");
  return cart;
};

module.exports = cartServices;
