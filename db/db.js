const Sequelize = require("sequelize");
const dbConnection = require("../config/dbConfig.js");
require("dotenv").config();

module.exports = new Sequelize(
  dbConnection.DB,
  dbConnection.USER,
  dbConnection.PASSWORD,
  {
    host: dbConnection.HOST,
    dialect: process.env.dialect,

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);
