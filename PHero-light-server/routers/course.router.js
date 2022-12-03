const router = require("express").Router();
const {
  createANewCourse,
  getSingleCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const verifyAccess = require("../middlewares/verifyAccess");

// routes are here
router.route("/").post(verifyAccess("admin", "instructor"), createANewCourse);

router
  .route("/:id")
  .get(getSingleCourse)
  .put(verifyAccess("instructor"))
  .delete(verifyAccess("admin"), deleteCourse);

module.exports = router;
