const db = require("../db/db");
const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Weather = db.define("weather", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: function () {
      return uuidv4();
    },
    primaryKey: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },
  weather_desc: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },
  temperature: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },

  humidity: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },
  foreign_key: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },
});

module.exports = Weather;
