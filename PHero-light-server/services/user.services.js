const Profile = require("../models/Profile");
const User = require("../models/User");
const services = {};

// findA user from document
services.findAUser = async (email) => {
  const user = await User.findOne({ email }).select("email");
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
  return { name, role, email, _id, token };
};

module.exports = services;
