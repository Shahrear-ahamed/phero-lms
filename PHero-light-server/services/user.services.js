const Profile = require("../models/Profile");
const User = require("../models/User");
const services = {};

// get details from document for a user
services.findUserDetailService = async (email) => {
  const user = await Profile.findOne({ email });
  return user;
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
    "email password role"
  );
  return user;
};

// create a new use document
services.userRegisterServices = async (data) => {
  // create a new user and also create a new profile
  const result = await User.create(data);
  const { name, role, email, _id, mobile } = result || {};

  // make a new profile
  await Profile.create({ name, role, email, mobile });

  // response send and make token
  const token = result.jwtToken({ role, email, _id });
  return { role, email, _id, token };
};

module.exports = services;
