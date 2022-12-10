const response = require("../middleware/response");
const User = require("../models/User");
const Bookmark = require("../models/Bookmark");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

// Config import
const { secret } = require("../config/dbConfig");
const { validationResult, param } = require("express-validator");

class BookmarkController {
  // GET ALL BOOKMARK
  static async retriveBookmark(req, res) {
    try {
      const id = req.user.id;
      // return all bookmark in the database
      const bookmark = await Bookmark.findAll({ where: { foreign_key: id } });

      if (!bookmark) {
        return res
          .status(404)
          .send(response("Faild to fetch bookmark", {}, false));
      }

      res.send(response("Fetched bookmark successfully", bookmark));
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }

  // GET BOOKMARK BY ID
  static async retriveBookmarkById(req, res) {
    try {
      const id = req.user.id;
      const bookmarkId = req.params.id;

      const bookmark = await Bookmark.findOne({
        where: { id: bookmarkId },
      });

      if (!bookmark) {
        return res.status(404).send(response("Faild to fetch user", {}, false));
      }

      res.send(response("Fetched user successfully", bookmark));
    } catch (err) {
      res.status(500).send("server error");
    }
  }

  // ADD BOOKMARK
  static async addBookmark(req, res) {
    const id = req.user.id;
    try {
      // distructure inputs
      const { key, name, localizedName, countryCode, country } = req.body;

      // check if input is empty
      if (!key || !name || !localizedName || !countryCode || !country) {
        return res.status(400).send({
          message: "Fill all fields",
        });
      }

      // save bookmark in the database
      const bookmark = await Bookmark.create({
        key,
        name,
        localizedName,
        countryCode,
        country,
        foreign_key: id,
      });

      if (!bookmark) {
        return res
          .status(500)
          .send(response("The bookmark can not be created", {}, false));
      }

      res.send(response("Bookmark was created successfully", { bookmark }));
    } catch (err) {
      res.status(500).send("server error");
    }
  }

  // DELETE BOOKMARK
  static async deleteBookmark(req, res) {
    try {
      const id = req.user.id;
      const bookmarkId = req.params.id;

      // cheack if bookmark exist in database
      const bookmarkExists = await Bookmark.findOne({
        where: { id: bookmarkId },
      });

      // if bookmark does not exit in db return invalid
      if (!bookmarkExists) {
        return res.status(404).send(response("Invalid Credentials", {}, false));
      }

      if (id != bookmarkExists.foreign_key)
        return res.status(404).send(response("Invalid Credentials", {}, false));

      // delete bookmark from db
      const bookmark = await Bookmark.destroy({ where: { id: bookmarkId } });

      return res.send(response("User was successfully deleted", bookmark));
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
}

module.exports = BookmarkController;
