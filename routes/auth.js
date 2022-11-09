const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { authUser, isAdmin } = require("../middleware/jwt");
const {
  listUsers,
  updateUserById,
  loginUser,
  deleteUserById,
  getUser,
} = require("../controllers/userController");

// @route GET api/auth
// @desc  Get logged in User // fetch user by id*
// @access Private
router.get("/", [authUser], getUser);

// @route GET api/auth
// @desc Fetch all users*
// @access Private
router.get("/users", [authUser, isAdmin], listUsers);

// @route POST api/auth
// @desc  Auth/Login user & get token
// @access Public
router.post(
  "/",
  [
    body("email", "Please include a valid credential").isEmail(),
    body("email", "Please include a valid credential").exists(),
  ],
  loginUser
);

// @route PUT api/auth
// @desc  Update user*
// @access Private
router.put("/", [authUser], updateUserById);

// @route DELETE api/auth
// @desc  Delete user account
// @access Private
router.delete("/", [authUser], deleteUserById);

module.exports = router;
