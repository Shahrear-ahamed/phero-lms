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
      required: true,
    },
    email: {
      type: String,
      minlength: 0,
      maxlength: 30,
      unique: true,
      trim: true,
      required: true,
    },
    mobile: {
      type: Number,
      min: 0,
      max: 11,
      required: true,
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
  },
  { timestamps: true }
);

// make user password hashed and
userSchema.pre("save", async function (next) {
  try {
    const userPassword = this.password;

    if (userPassword === this.cPassword) {
      const saltRounds = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(userPassword, saltRounds);
      this.password = hashed;
      this.cPassword = undefined;
      next();
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
    id: userData?.id,
  };
  const token = generateToken(data);
  return token;
};

const user = model("User", userSchema);

module.exports = user;
