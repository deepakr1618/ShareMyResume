const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  console.log(req.headers["auth-token"]);
  try {
    const decoded = jwt.verify(req.headers["auth-token"], "123");
    req.userData = decoded;
    next();
  } catch (e) {
    res.json({
      message: "failure",
      type: "FORBIDDEN",
    });
  }
}

module.exports = verifyUser;
