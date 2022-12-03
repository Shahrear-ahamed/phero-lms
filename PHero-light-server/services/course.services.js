const Course = require("../models/Course");
const cousreService = {};

// get a single course
cousreService.getSingleCourse = async (id) => {
  const course = await Course.findById({ _id: id }).select(
    "-createdAt -updatedAt -__v"
  );
  return course;
};

// create a new course for student
cousreService.createCourseService = async (course) => {
  const result = await Course.create(course);
  return result;
};

module.exports = cousreService;
