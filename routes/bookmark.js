const router = require("express").Router();
const { check } = require("express-validator");
const { authUser } = require("../middleware/jwt");
const {
  addBookmark,
  retriveBookmark,
  retriveBookmarkById,
  deleteBookmark,
} = require("../controllers/bookmarkController");

// @route POST api/waether
// @desc save weather
// @access private
router.post("/", [authUser], addBookmark);

// @route GET WEATHER api/weather
// @desc get all saved weather
// @access private
router.get("/", [authUser], retriveBookmark);

// @route GET WEATHER api/weather
// @desc get weather by id
// @access private
router.get("/:id", [authUser], retriveBookmarkById);

// @route DELETE WEATHER api/weather
// @desc delete weather
// @access private
router.delete("/:id", [authUser], deleteBookmark);

module.exports = router;
