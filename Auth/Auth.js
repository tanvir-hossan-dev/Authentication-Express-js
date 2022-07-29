const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authRegister = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log(email);
    if (!name || !email || !password || !confirmPassword) {
      res.status(400).json({ Message: "provide your information" });
    }

    let userData = await User.findOne({ email });
    if (userData) {
      res.status(400).json({ message: "This email is already in use" });
    }
    userData = new User({
      name,
      email,
      password,
      confirmPassword,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    userData.password = hash;
    userData.confirmPassword = hash;

    await userData.save();
    res.status(201).json({ Message: "User created successful", userData });
  } catch (e) {
    next(e);
  }
};

const authLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ Message: "email Creadential" });
    }

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(400).json({ Message: "password  Creadential" });
    }
    delete userData._doc.password;

    const token = jwt.sign(userData._doc, "tanvir-hossan");

    return res.status(201).json({ Message: "Login Successfull", token });
  } catch (e) {
    next(e);
  }
};

module.exports = { authRegister, authLogin };
