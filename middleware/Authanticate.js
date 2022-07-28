const jwt = require("jsonwebtoken");
const Post = require("../models/User");

const Authanticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(500).json({ Message: "Unauthorazied" });
    }
    const decoded = jwt.verify(token, "tanvir-hossan");
    const post = await Post.findById(decoded._id);

    if (!post) {
      return res.status(500).json({ Message: "Unauthorazied" });
    }
    req.post = post;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = Authanticate;
