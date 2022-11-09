const response = require("../middleware/response");
const User = require("../models/User");
const Weather = require("../models/Weather");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

// Config import
const { secret } = require("../config/dbConfig");
const { validationResult, param } = require("express-validator");

class WeatherController {
  // GET ALL WEATHER
  static async retriveWeather(req, res) {
    try {
      const id = req.user.id;
      // return all weather in the database
      const weather = await Weather.findAll({ where: { foreign_key: id } });

      if (!weather) {
        return res
          .status(404)
          .send(response("Faild to fetch weather", {}, false));
      }

      res.send(response("Fetched weather successfully", weather));
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }

  // GET WEATHER BY ID
  static async retriveWeatherById(req, res) {
    try {
      const id = req.user.id;
      const weatherId = req.params.id;

      const weather = await Weather.findOne({
        where: { id: weatherId },
      });

      if (!weather) {
        return res.status(404).send(response("Faild to fetch user", {}, false));
      }

      res.send(response("Fetched user successfully", weather));
    } catch (err) {
      res.status(500).send("server error");
    }
  }

  // SAVE WEATHER
  static async saveWeather(req, res) {
    const id = req.user.id;
    try {
      // distructure inputs
      const { location, weather_desc, temperature, humidity } = req.body;

      // check if input is empty
      if (!location || !weather_desc || !temperature || !humidity) {
        return res.status(400).send({
          message: "Fill all fields",
        });
      }

      // save weather in the database
      const weather = await Weather.create({
        location,
        weather_desc,
        temperature,
        humidity,
        foreign_key: id,
      });

      if (!weather) {
        return res
          .status(500)
          .send(response("The user can not be created", {}, false));
      }

      res.send(response("User was created successfully", { weather }));
    } catch (err) {
      res.status(500).send("server error");
    }
  }

  // Here we are not deleting the actual user but we are changing the accountStatus field of the user from active to notActive
  static async deleteWeather(req, res) {
    try {
      const id = req.user.id;
      const weatherId = req.params.id;

      // cheack if weather exist in database
      const weatherExists = await Weather.findOne({ where: { id: weatherId } });

      // if weather does not exit in db return invalid
      if (!weatherExists) {
        return res.status(404).send(response("Invalid Credentials", {}, false));
      }

      if (id != weatherExists.foreign_key)
        return res.status(404).send(response("Invalid Credentials", {}, false));

      // delete weather from db
      const weather = await Weather.destroy({ where: { id: weatherId } });

      return res.send(response("User was successfully deleted", weather));
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
}

module.exports = WeatherController;
