const jwt = require("jsonwebtoken");

const generateToken = async (data) => {
  const token = await jwt.sign(data, process.env.TOKEN_KEY, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = generateToken;
