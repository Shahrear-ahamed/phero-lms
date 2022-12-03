const Course = require("../models/Course");
const cousreService = {};

// get a single course
cousreService.getSingleCourse = async (id) => {
  return await Course.findById({ _id: id }).select(
    "-createdAt -updatedAt -__v"
  );
};

// create a new course for student
cousreService.createCourseService = async (course) => {
  return await Course.create(course);
};

// update a course
cousreService.updateCourse = async (_id, updateData) => {
  const { courseList, ...rest } = updateData;

  return await Course.updateOne(
    { _id },
    { $set: rest, $push: { courseList } },
    { runValidators: true }
  );
};

// delete a course
cousreService.deleteACourse = async (id) => {
  return await Course.deleteOne({ _id: id });
};

module.exports = cousreService;
