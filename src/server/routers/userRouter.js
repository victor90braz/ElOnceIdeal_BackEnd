const express = require("express");
const { validate } = require("express-validation");
const {
  userRegisterCredentials,
  credentialsLoginSchema,
} = require("../../schemas/userCredentials");
const { registerUser, loginUser } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/register", validate(userRegisterCredentials), registerUser);
userRouter.post("/login", validate(credentialsLoginSchema), loginUser);

module.exports = userRouter;
