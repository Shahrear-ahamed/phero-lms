const { Schema, model } = require("mongoose");
const validator = require("validator");

const profileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: "User",
    },
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
      phone: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      postcode: Number,
      country: String,
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
