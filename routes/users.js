const router = require("express").Router();
const { check } = require("express-validator");
const { createUser, resetPwd } = require("../controllers/userController");

// @route POST api/users
// @desc Register user*
// @access Public
router.post(
  "/",
  [
    check("email", "Provide a valid email").isEmail(),
    check("password", "Password should be more than 6").isLength({ min: 6 }),
  ],
  createUser
);

// N
// @route UPDATE PASSWORD api/users
// @desc Reset password
// @access Public
router.post(
  "/forget-password",
  check("email", "Provide a valid email").isEmail(),
  resetPwd
);

module.exports = router;
