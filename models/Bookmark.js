const db = require("../db/db");
const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");

// key,
// name,
// localizedName,
// countryCode,
// country,

const Bookmark = db.define("bookmark", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: function () {
      return uuidv4();
    },
    primaryKey: true,
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },
  localizedName: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },

  countryCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
    defaultValue: "",
  },
  country: {
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

module.exports = Bookmark;
