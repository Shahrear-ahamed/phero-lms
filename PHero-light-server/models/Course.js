const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const courseSchema = new Schema(
  {
    instractor: {
      name: { type: String, minlength: 0, required: true },
      id: { type: ObjectId, ref: "Profil", required: true },
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    thumbnail: {
      type: String,
      required: true,
      unique: true,
      minlength: 0,
      maxlength: 255,
    },
    title: {
      type: String,
      minlength: 0,
      required: true,
    },
    description: {
      type: String,
      minlength: 0,
      maxlength: 500,
      required: true,
    },
    verified: {
      type: Boolean,
      enum: {
        values: ["true", "false"],
        message: "",
        default: "false",
      },
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
      max: 99999,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["In Review", "Active", "Free"],
        message: "this course is {VALUE}",
        default: "In Review",
      },
    },
    courseList: [
      // each first object is milestone
      {
        // milestone tile and milestone modules are here
        milestoneTitle: {
          type: String,
          minlength: 0,
          required: true,
        },
        modules: [
          {
            moduleTitle: {
              type: String,
              minlength: 0,
              required: true,
            },
            url: {
              type: String,
              minlength: 0,
              required: true,
              unique: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

courseSchema.pre("save", function (next) {
  this.verified = false;
  next();
});

const course = model("Course", courseSchema);

module.exports = course;
