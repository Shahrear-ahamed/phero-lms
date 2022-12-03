const {
  findAUser,
  userRegisterServices,
} = require("../services/user.services");
const controller = {};

controller.singleUserController = async (req, res) => {};
controller.loginUserController = async (req, res) => {};

// register a new user
controller.registerUserController = async (req, res) => {
  try {
    const hasUser = await findAUser(req?.body.email);
    if (hasUser) {
      throw new Error("You can not register with this email");
    }

    const userResult = await userRegisterServices(req?.body);
    // response back
    res.status(200).json({ status: 200, userResult });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports = controller;
