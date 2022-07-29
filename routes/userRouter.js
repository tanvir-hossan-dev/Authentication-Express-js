const express = require("express");
const userRouter = express.Router();
const Auth = require("../Auth/Auth");

userRouter.post("/register", Auth.authRegister);

userRouter.post("/login", Auth.authLogin);

userRouter.get("/", async (req, res) => {
  const userData = await User.find({});
  res.json(userData);
});

module.exports = userRouter;
