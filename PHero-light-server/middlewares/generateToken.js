const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.TOKEN_KEY, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = generateToken;
