const verifyAccess = require("../middlewares/verifyAccess");
const {
  addToCart,
  getCart,
  deleteCartItem,
} = require("../controllers/cart.controller");

const router = require("express").Router();

router
  .route("/")
  .get(verifyAccess("admin", "student", "instructor"), getCart)
  .put(verifyAccess("admin", "student", "instructor"), addToCart);
router
  .route("/:id")
  .delete(verifyAccess("admin", "student", "instructor"), deleteCartItem);
module.exports = router;
