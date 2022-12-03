const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const fullToken = req.headers.authorization;

  if (!fullToken) {
    return res
      .status(403)
      .json({ status: "fail", error: "token are not provided" });
  }
  const token = fullToken?.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
    if (err) {
      return res.status(403).json({
        status: "fail",
        error: err.message,
      });
    }

    req.user = decoded;
    next();
  });

  //   next();
};

module.exports = verifyToken;
