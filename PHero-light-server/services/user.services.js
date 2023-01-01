const Cart = require("../models/Cart");
const Profile = require("../models/Profile");
const User = require("../models/User");
const PurchasedCourse = require("../models/Purchased_course");
const services = {};

// get details from document for a user
services.findUserDetailService = async (userId) => {
  const user = await Profile.findOne({ userId }).select(
    "-_id -createdAt -updatedAt -__v"
  );
  const courses = await PurchasedCourse.findOne({ userId }).select(
    "-_id courseList"
  );

  return { ...user.toObject(), ...courses.toObject() };
};

// findA user from document
services.findAUser = async (email) => {
  const user = await User.findOne({ email }).select("email");
  return user;
};

// user login
services.userLoginService = async (data) => {
  // find a login user
  const user = await User.findOne({ email: data?.email }).select(
    "email password role name"
  );
  return user;
};

// create a new use document
services.userRegisterServices = async (data) => {
  // create a new user and also create a new profile
  const result = await User.create(data);
  const { name, role, email, _id, mobile } = result || {};

  // make a new profile and cart
  await Profile.create({ name, role, email, mobile, userId: _id });
  await Cart.create({ userId: _id });
  await PurchasedCourse.create({ userId: _id });

  // response send and make token
  const token = result.jwtToken({ role, email, _id });
  return { role, email, _id, token };
};

module.exports = services;
