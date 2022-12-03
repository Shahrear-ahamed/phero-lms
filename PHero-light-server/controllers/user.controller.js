const {
  findAUser,
  userLoginService,
  userRegisterServices,
  findUserDetailService,
} = require("../services/user.services");
const controller = {};

controller.singleUserController = async (req, res) => {
  try {
    const userData = req?.user;
    const user = await findUserDetailService(userData?.email);

    if (!user) throw new Error("user not found by this email");

    // response back
    res.status(200).json({ status: 200, message: "Get user data", user });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

// login a user
controller.loginUserController = async (req, res) => {
  try {
    const userResult = await userLoginService(req?.body);

    if (!userResult) throw new Error("user does not exist");

    // compare password
    const userVerification = await userResult.verifyUser(
      req?.body?.password,
      userResult?.password
    );

    // if password is wrong
    if (!userVerification) throw new Error("login crediantials are wrong");

    // if password is correct then we should generate token and response
    const token = await userResult.jwtToken(userResult);

    // response back
    res.status(200).json({
      status: 200,
      response: {
        email: userResult.email,
        role: userResult.role,
        _id: userResult._id,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

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
