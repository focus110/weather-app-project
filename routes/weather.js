const router = require("express").Router();
const { check } = require("express-validator");
const {
  saveWeather,
  retriveWeather,
  retriveWeatherById,
  deleteWeather,
} = require("../controllers/weatherController");
const { authUser } = require("../middleware/jwt");

// @route POST api/waether
// @desc save weather
// @access private
router.post("/", [authUser], saveWeather);

// @route GET WEATHER api/weather
// @desc get all saved weather
// @access private
router.get("/", [authUser], retriveWeather);

// @route GET WEATHER api/weather
// @desc get weather by id
// @access private
router.get("/:id", [authUser], retriveWeatherById);

// @route DELETE WEATHER api/weather
// @desc delete weather
// @access private
router.delete("/:id", [authUser], deleteWeather);

module.exports = router;
