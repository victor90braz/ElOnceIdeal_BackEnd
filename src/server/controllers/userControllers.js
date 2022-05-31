const bcrypt = require("bcrypt");
const debug = require("debug");
const chalk = require("chalk");
const User = require("../../database/model/User");

const registerUser = async (req, res, next) => {
  const { name, username, password } = req.body;

  const queryFind = { username };
  const user = await User.findOne(queryFind);

  try {
    if (user) {
      const error = new Error();
      error.customMessage = "User already exists";
      error.statusCode = 409;
      next(error);
      return;
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const queryCreate = {
      username,
      password: encryptPassword,
      name,
    };

    await User.create(queryCreate);

    debug(chalk.green("User created"));
    res.status(201).json({ msg: "User created" });
  } catch (error) {
    error.statusCode = 400;
    debug(chalk.red("Bad request"));
    error.message = "Bad request";
    next(error);
  }
};

module.exports = registerUser;
