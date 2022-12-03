const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const generateToken = require("../middlewares/generateToken");

const userSchema = new Schema(
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
    password: {
      type: String,
      minlength: 0,
      trim: true,
      require: true,
    },
    cPassword: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ["student", "instructor", "admin"],
        message: "this {VALUE} role can't be assignable",
      },
      default: "student",
    },
  },
  { timestamps: true }
);

// make user password hashed and
userSchema.pre("save", async function (next) {
  try {
    const userPassword = this.password;

    if (!this.cPassword) {
      throw new Error("Confirm password must be needed");
    }

    if (userPassword === this.cPassword) {
      const saltRounds = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(userPassword, saltRounds);
      this.password = hashed;
      this.cPassword = undefined;
      next();
    } else {
      throw new Error("Password and confirm password did not match");
    }
  } catch (e) {
    next(e);
  }
});

// verify user password for valid user
userSchema.methods.verifyUser = function (sendPassword, dbPassword) {
  const verify = bcrypt.compare(sendPassword, dbPassword);
  return verify;
};

// make token for send user validation
userSchema.methods.jwtToken = function (userData) {
  const data = {
    email: userData?.email,
    role: userData?.role,
    id: userData?._id,
  };
  const token = generateToken(data);
  return token;
};

const user = model("User", userSchema);

module.exports = user;
