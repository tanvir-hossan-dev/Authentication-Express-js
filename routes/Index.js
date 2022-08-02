const router = require("express").Router();

const userRouter = require("./userRouter");

router.use("/api/auth", userRouter);

module.exports = router;
