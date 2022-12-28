const router = require("express").Router();
const { initPayment } = require("../controllers/payment.controller");
const verifyAccess = require("../middlewares/verifyAccess");

router
  .route("/")
  .get(verifyAccess("admin", "student", "instructor"), initPayment);

module.exports = router;
