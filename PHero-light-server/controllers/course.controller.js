const {
  createCourseService,
  getSingleCourse,
  deleteACourse,
} = require("../services/course.services");
const courseController = {};

// get a single course
courseController.getSingleCourse = async (req, res) => {
  try {
    const id = req?.params?.id;
    const course = await getSingleCourse(id);

    if (!course) throw new Error("course not found");

    res.status(200).json({ status: 200, message: "Ok", data: course });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

// create a new course
courseController.createANewCourse = async (req, res) => {
  try {
    const courseResult = await createCourseService(req?.body);

    if (!courseResult)
      throw new Error("Internal server error, course can't uploaded");

    res.status(200).json({
      status: 200,
      message: "Ok",
      data: { id: courseResult._id, title: courseResult.title },
    });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

// delete single course
courseController.deleteCourse = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await deleteACourse(id);

    console.log(result);

    if (result?.deletedCount === 0)
      throw new Error("Can't delete this course");

    // response
    res.status(200).json({ status: 200, message: "Deleted", data: result });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports = courseController;
