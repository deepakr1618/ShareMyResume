const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

router.post(
  "/signup",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 1 }).escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        message: "failure",
        type: "VALIDATION_ERROR",
        errors,
      });
    } else {
      //Inputs are validated
      const { name, email, password } = req.body;
      const userExist = await UserModel.find({ email: email });
      if (userExist.length != 0) {
        // The email is already registered, hence reject
        console.log(userExist);
        res.json({
          message: "failure",
          type: "EMAIL_EXISTS",
          data: "User with the email already exists!",
        });
      } else {
        // The email isnt registered,sign up the user
        const hashedPass = bcrypt.hashSync(password, 5);
        console.log(hashedPass);
        const user = new UserModel({
          _id: new mongoose.Types.ObjectId(),
          email,
          password: hashedPass,
          name,
        });
        const userData = await user.save();
        res.json({
          message: "success",
          type: "USER_CREATED",
          data: {
            name: userData.name,
            id: userData._id,
            email: userData.email,
          },
        });
      }
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.json({
        message: "failure",
        type: "VALIDATION_ERROR",
        data: error,
      });
    } else {
      const { email, password } = req.body;
      const userData = await UserModel.find({ email });
      if (userData.length == 0) {
        res.json({
          message: "failure",
          type: "EMAIL_DOES_NOT_EXIST",
          data: "Email doesnt exist!",
        });
      }
      bcrypt.compare(password, userData[0].password, (err, result) => {
        if (err) {
          res.json({
            message: "failure",
            type: "AUTH_FAILED",
          });
        } else {
          if (result) {
            // successful login
            const token = jwt.sign(
              {
                email: userData[0].email,
                id: userData[0]._id,
              },
              "123",
              {
                expiresIn: "1h",
              }
            );
            res.json({
              message: "success",
              type: "AUTH_SUCCESSFUL",
              token,
              id: userData[0]._id,
            });
          } else {
            //incorrect password
            res.json({
              message: "failure",
              type: "AUTH_FAILURE",
            });
          }
        }
      });
    }
  }
);

module.exports = router;
