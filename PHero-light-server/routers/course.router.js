const router = require("express").Router();
const {
  createANewCourse,
  getSingleCourse,
} = require("../controllers/course.controller");
const verifyAccess = require("../middlewares/verifyAccess");

// routes are here
router
  .route("/:id")
  .get(getSingleCourse)
  .put(verifyAccess("instructor"))
  .delete(verifyAccess("admin"));

router.route("/").post(verifyAccess("admin", "instructor"), createANewCourse);
module.exports = router;
