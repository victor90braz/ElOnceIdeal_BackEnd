const chalk = require("chalk");
const debug = require("debug");
const Player = require("../../database/model/Player");

const getPlayer = async (req, res) => {
  debug(chalk.green("Player request received"));
  const players = await Player.find();
  res.status(200).json(players);
};

const deletePlayer = async (req, res, next) => {
  const { idPlayer } = req.params;

  try {
    await Player.findByIdAndDelete(idPlayer);

    res.status(200).json({ msg: "Player deleted" });
    debug(chalk.green("Someone deleted a player"));
  } catch (err) {
    debug(chalk.red("Someone tried to delete a player that we don't have"));
    err.message = "No player with that id found";
    err.code = 404;

    next(err);
  }
};

module.exports = { getPlayer, deletePlayer };
