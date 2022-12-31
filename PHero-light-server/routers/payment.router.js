const router = require("express").Router();
const {
  initPayment,
  ipnMessage,
} = require("../controllers/payment.controller");
const verifyAccess = require("../middlewares/verifyAccess");
const verifyToken = require("../middlewares/verifyToken");

router
  .route("/")
  .get(
    verifyToken,
    verifyAccess("admin", "student", "instructor"),
    initPayment
  );

router.route("/ipn").post(ipnMessage);

module.exports = router;
