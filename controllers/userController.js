const response = require("../middleware/response");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

// Config import
const { secret } = require("../config/dbConfig");
const { validationResult, param } = require("express-validator");

class UserController {
  // GET ALL USERS
  static async listUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      const userOtp = await UserOTP.findAll({});

      if (!users) {
        return res
          .status(404)
          .send(response("Faild to fetch users", {}, false));
      }

      res.send(response("Fetched users successfully", users));
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }

  // FETCH USER BY ID
  static async getUser(req, res) {
    try {
      const id = req.user.id;

      const user = await User.findOne({
        attributes: { exclude: ["password"] },
        where: { id },
      });

      if (!user) {
        return res.status(404).send(response("Faild to fetch user", {}, false));
      }

      if (user.accountStatus === "notActive") {
        return res.status(404).send(response("Invalid Credentials", {}, false));
      }

      res.send(response("Fetched user successfully", user));
    } catch (err) {
      // console.log(err.message);
      res.status(500).send("server error");
    }
  }

  // REGISTER USER
  static async createUser(req, res) {
    // validate email
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, company, password } = req.body;

      // check if input is empty
      if (!name || !email || !company || !password) {
        return res.status(400).send({
          message: "Fill all fields",
        });
      }

      // Check if email already exists
      const emailExists = await User.findOne({
        where: { email },
      });

      if (emailExists)
        return res
          .status(500)
          .send(
            response("User with the given email already exists", {}, false)
          );

      // save User in the database
      const user = await User.create({
        name,
        email,
        company,
        password: bcrypt.hashSync(password, 10),
      });

      if (!user) {
        return res
          .status(500)
          .send(response("The user can not be created", {}, false));
      }

      const payload = {
        id: user.id,
        role: user.role,
      };

      const token = jwt.sign(payload, secret, { expiresIn: "1d" });

      res.send(response("User was created successfully", { user, token }));
    } catch (err) {
      res.status(500).send("server error");
    }
  }

  // UPDATE USER BY ID
  static async updateUserById(req, res) {
    try {
      const id = req.user.id;

      const {
        firstname,
        middlename,
        lastname,
        email,
        phone,
        gender,
        dob,
        religion,
        address,
        nationality,
        state,
        lga,
        password,
      } = req.body;

      // Build user object
      const userFields = {};
      if (firstname) userFields.firstname = firstname;
      if (middlename) userFields.middlename = middlename;
      if (lastname) userFields.lastname = lastname;
      if (email) userFields.email = email;
      if (phone) userFields.phone = phone;
      if (gender) userFields.gender = gender;
      if (dob) userFields.dob = dob;
      if (religion) userFields.religion = religion;
      if (address) userFields.home_address = address;
      if (nationality) userFields.nationality = nationality;
      if (state) userFields.state_of_origin = state;
      if (lga) userFields.local_gov = lga;
      // if password is provided then bcrypt password
      if (password) userFields.password = bcrypt.hashSync(password, 10);

      // find the id in database
      const userExists = await User.findOne({
        where: {
          id,
        },
      });

      // if id do not exist print error message
      if (!userExists)
        return res
          .status(500)
          .send(response(" User with the given ID does not exists", {}, false));

      // check if phone is verified

      // check if email is verified

      // update user username, email, phone, password
      const user = await User.update(userFields, { where: { id: id } });

      if (!user) {
        return res
          .status(500)
          .send(response("The user can not be updated", {}, false));
      }

      return res.send(response("User was successfully updated", user));
    } catch (err) {
      res.status(500).send("server error");
    }
  }

  // LOGIN USER
  static async loginUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      // check if user exit
      if (!user) {
        return res.status(404).send(response("invalid credentials", {}, false));
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      // check if password match
      if (!isMatch) {
        return res.status(403).send(response("invalid credentials", {}, false));
      }

      const payload = {
        id: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "1d" });

      return res.send(response("Login successful", { user, token }));
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }

  // Here we are not deleting the actual user but we are changing the accountStatus field of the user from active to notActive
  static async deleteUserById(req, res) {
    try {
      const id = req.user.id;

      const userExists = await User.findOne({ where: { id } });

      if (!userExists) {
        return res.status(404).send(response("Invalid Credentials", {}, false));
      }

      const user = await User.update(
        {
          accountStatus: "notActive",
        },
        { where: { id } }
      );

      if (!user)
        return res
          .status(500)
          .send(response(" User can not be deleted ", {}, false));

      return res.send(response("User was successfully deleted", user));
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }

  static async resetPwd(req, res) {
    if (true) {
      return res.status(500).send(response("Password reset failed", {}, false));
    }
    try {
      const { email, password } = req.body;

      // check if user exit
      const userExists = await User.findOne({
        where: {
          email,
        },
      });

      // if id do not exist print error message
      if (!userExists)
        return res
          .status(500)
          .send(response(" User with the given ID does not exists", {}, false));

      // check if user is verified

      // if password is provided then bcrypt password
      password ? (password = bcrypt.hashSync(password, 10)) : null;

      // update user username, email, phone, password
      const user = await User.update(
        {
          password: password,
        },
        { where: { id: id } }
      );

      if (!user) {
        return res
          .status(500)
          .send(response("The user can not be updated", {}, false));
      }

      return res.send(response("User was successfully updated", user));
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
}

module.exports = UserController;
