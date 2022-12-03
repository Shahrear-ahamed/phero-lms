const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const courseSchema = new Schema(
  {
    instractor: {
      name: { type: String, minlength: 0, required: true },
      id: { type: ObjectId, ref: "Profil" },
    },
    publishDate: {
      type: Date,
      default: Date.now,
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

const course = model("Course", courseSchema);

module.exports = course;
