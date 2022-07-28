require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/userRouter");
const Authanticate = require("./middleware/Authanticate");

const app = express();
app.use(express.json());

app.use("/auth", userRouter);

app.get("/", Authanticate, (req, res) => {
  console.log("post", req.post);
  res.json({ Message: "This is Home Page" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ Message: "This is Server side error" });
});

const port = process.env.port || 8000;
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("MongoDB is connected");
    app.listen(port, () => {
      console.log(`${port} port is connected`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
