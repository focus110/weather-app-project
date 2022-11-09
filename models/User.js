const db = require("../db/db");
const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const User = db.define("users", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: function () {
      return uuidv4();
    },
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },
});

module.exports = User;
