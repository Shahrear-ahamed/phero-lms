const {
  getCartdetails,
  addToCartService,
} = require("../services/cart.services");
const cartController = {};

cartController.addToCart = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const cartDetails = req?.body;

    const createdCart = await addToCartService(userId, cartDetails);

    if (createdCart.modifiedCount !== 1) {
      throw new Error("Can't add to cart");
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

module.exports = cartController;
