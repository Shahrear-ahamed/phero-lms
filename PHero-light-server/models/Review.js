const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const reviewSchema = new Schema({
  user: {
    name: String,
    image: String,
    profile: {
      type: ObjectId,
      ref: "Profile",
    },
    required: true,
  },
  course: {
    type: ObjectId,
    ref: "Course",
    required: true,
  },
  comments: {
    type: String,
    minlength: 0,
    maxlength: 255,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
});
const review = model("Review", reviewSchema);
module.exports = review;
