const express = require("express");
const registerUser = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

module.exports = userRouter;
