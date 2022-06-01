const express = require("express");
const { validate } = require("express-validation");
const userRegisterCredentials = require("../../schemas/userCredentials");
const registerUser = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/register", validate(userRegisterCredentials), registerUser);

module.exports = userRouter;
