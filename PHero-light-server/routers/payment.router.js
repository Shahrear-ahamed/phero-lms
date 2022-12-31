const router = require("express").Router();
const {
  initPayment,
  ipnMessage,
} = require("../controllers/payment.controller");
const verifyAccess = require("../middlewares/verifyAccess");

router
  .route("/")
  .get(verifyAccess("admin", "student", "instructor"), initPayment);

router.route("/ipn").post(ipnMessage);

module.exports = router;
