const { Schema, model } = require("mongoose");
const validator = require("validator");

const profileSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 0,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      minlength: 0,
      maxlength: 30,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Provide a valid Email"],
      required: [true, "Email must be required"],
    },
    mobile: {
      type: Number,
      min: 0,
      required: [true, "Mobile number require"],
    },
    role: {
      type: String,
      enum: {
        values: ["student", "instructor", "admin"],
        message: "this {VALUE} role can't be assignable",
      },
      default: "student",
    },
    address: {
      type: String,
      minlength: 0,
      maxlength: 255,
      trim: true,
    },
    works: [{ company: String, joinDate: String, resignDate: String }],
    skills: [{ type: String, minlength: 0 }],
    socials: [{ type: String, minlength: 0 }],
    experiance: {
      type: String,
    },
  },
  { timestamps: true }
);

const profile = model("Profile", profileSchema);

module.exports = profile;
