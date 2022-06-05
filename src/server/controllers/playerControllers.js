const chalk = require("chalk");
const debug = require("debug");
const Player = require("../../database/model/Player");

const getPlayer = async (req, res) => {
  debug(chalk.green("Player request received"));
  const players = await Player.find();
  res.status(200).json(players);
};

module.exports = { getPlayer };
