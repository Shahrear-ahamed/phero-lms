const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const purchasedCoursesSchema = new Schema(
  {
    userId: { type: ObjectId, ref: "User" },
    courseList: [
      {
        title: { type: String, required: true },
        // image: { type: String, required: false },
        price: { type: Number, required: false },
        courseId: { type: ObjectId, ref: "Course", required: true },
      },
    ],
  },
  { timestamps: true }
);

const PurchasedCourse = model("Purchased_course", purchasedCoursesSchema);
module.exports = PurchasedCourse;
