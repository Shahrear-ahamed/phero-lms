const {
  getCartdetails,
  addToCartService,
  deleteCartitemService,
} = require("../services/cart.services");
// const removeDuplicates = require("../utils/compareTwoCart");
const cartController = {};

cartController.addToCart = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const cartDetails = req?.body;

    const createdCart = await addToCartService(userId, cartDetails);

    if (createdCart?.modifiedCount !== 1 && createdCart.matchedCount !== 1) {
      throw new Error("Can't add to cart this course");
    }

    res.status(200).json({ status: 200, message: "OK", createdCart });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

cartController.getCart = async (req, res) => {
  try {
    const userId = req?.user?.id;

    const cartDetails = await getCartdetails(userId);

    res.status(200).json({ status: 200, message: "Ok", cartDetails });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

cartController.deleteCartItem = async (req, res) => {
  try {
    const id = req?.params.id;
    const userId = req?.user?.id;
    console.log(id);

    const deleteCart = await deleteCartitemService(userId, id);

    res.status(200).json({ status: 200, message: "Ok", deleteCart });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports = cartController;
