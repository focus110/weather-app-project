const jwt = require("jsonwebtoken");
const { secret } = require("../config/dbConfig");
const response = require("./response");

const authUser = (req, res, next) => {
  //Find jwt in header
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(403).send(response("Please login", {}, false));
  }

  try {
    //Verify jwt token
    // const tokenBody = token.slice(7);
    // console.log(tokenBody);
    jwt.verify(token, secret, (error, user) => {
      if (error) {
        return res.status(401).send(response("Unauthorized", {}, false));
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role === "admin") {
    res.status(200);
    next();
  } else {
    return res.status(401).send(response("Access Denied", {}, false));
  }
};

module.exports = {
  authUser,
  isAdmin,
};
