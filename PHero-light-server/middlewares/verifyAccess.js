const verifyAccess = (...role) => {
  return (req, res, next) => {
    const userRole = req?.user?.role;
    const userRolesLower = userRole.toLowerCase();

    const roleLowerTxt = [];
    role.forEach((element) => {
      roleLowerTxt.push(element.toLowerCase());
    });

    const verify = roleLowerTxt.includes(userRolesLower);

    if (!verify)
      res.status(401).json({
        status: 401,
        message: "You are not authorized for this access",
      });

    // next call are here
    next();
  };
};

module.exports = verifyAccess;
