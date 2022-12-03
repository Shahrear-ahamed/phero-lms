const router = require("express").Router();

// controllers are here
const {
  loginUserController,
  registerUserController,
} = require("../controllers/user.controller");

router.post("/login", loginUserController);
router.post("/register", registerUserController);

module.exports = router;
