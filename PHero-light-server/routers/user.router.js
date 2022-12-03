const router = require("express").Router();

// controllers are here
const {
  singleUserController,
  loginUserController,
  registerUserController,
} = require("../controllers/user.controller");

router.get("/me", singleUserController);
router.post("/login", loginUserController);
router.post("/register", registerUserController);

module.exports = router;
