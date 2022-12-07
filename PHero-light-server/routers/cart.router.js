const verifyAccess = require("../middlewares/verifyAccess");
const { addToCart, getCart } = require("../controllers/cart.controller");

const router = require("express").Router();

router
  .route("/")
  .post(verifyAccess("admin", "student", "instructor"), addToCart)
  .get(verifyAccess("admin", "student", "instructor"), getCart);
module.exports = router;
