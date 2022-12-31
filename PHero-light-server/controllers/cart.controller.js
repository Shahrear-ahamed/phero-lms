const {
  getCartdetails,
  addToCartService,
} = require("../services/cart.services");
const cartController = {};

cartController.addToCart = async (req, res) => {
  try {
    const email = req?.user?.email;
    const cartDetails = req?.body;

    const createdCart = await addToCartService(email, cartDetails);

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
    const userEmail = req?.user?.email;

    const cartDetails = await getCartdetails(userEmail);

    res.status(200).json({ status: 200, message: "Ok", cartDetails });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports = cartController;
