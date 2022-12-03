const router = require("express").Router();

// controllers are here
const {
  loginUserController,
  singleUserController,
  registerUserController,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/me", verifyToken, singleUserController);
router.post("/login", loginUserController);
router.post("/register", registerUserController);

module.exports = router;
