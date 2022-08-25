const chalk = require("chalk");
const debug = require("debug");
const Player = require("../../database/model/Player");

const customError = require("../../utils/customError");

const getPlayer = async (req, res) => {
  debug(chalk.green("Player request received"));
  const players = await Player.find();
  res.status(200).json(players);
};

const getPlayerID = async (req, res, next) => {
  const { idPlayer } = req.params;
  try {
    const player = await Player.findById(idPlayer);

    debug(chalk.green("Someone asked for a specific player"));

    res.status(200).json({ player });
  } catch (err) {
    err.message = "Player not found";
    err.code = 404;

    next(err);
  }
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

const createPlayer = async (req, res, next) => {
  const {
    name,
    nationality,
    perfil,
    video,
    image,
    speed,
    shoot,
    pass,
    agility,
    defense,
    strength,
  } = req.body;

  const searchByName = { name };
  const player = await Player.findOne(searchByName);

  try {
    if (player) {
      const error = new Error();
      const customNewError = customError(409, "Player already exists");
      error.statusCode = 409;
      next(customNewError);
      return;
    }

    const playerCreate = {
      name,
      nationality,
      perfil,
      video,
      image,
      speed,
      shoot,
      pass,
      agility,
      defense,
      strength,
    };

    await Player.create(playerCreate);

    debug(chalk.green("Player created"));
    res.status(201).json({ msg: "Player created" });
  } catch (error) {
    error.statusCode = 400;
    debug(chalk.red("Bad request"));
    error.customMessage = "Bad request";

    next(error);
  }
};

const editPlayer = async (req, res, next) => {
  const { idPlayer } = req.params;
  const {
    name,
    nationality,
    perfil,
    video,
    image,
    speed,
    shoot,
    pass,
    agility,
    defense,
    strength,
  } = req.body;
  try {
    const playerEdited = {
      name,
      nationality,
      perfil,
      video,
      image,
      speed,
      shoot,
      pass,
      agility,
      defense,
      strength,
    };

    await Player.findByIdAndUpdate(idPlayer, playerEdited);
    const newPlayer = await Player.findById(idPlayer);

    debug(newPlayer);

    res.status(200).json(newPlayer);
  } catch (error) {
    debug(chalk.red("Bad request, player not exist to be edit."));

    error.statusCode = 400;
    error.customMessage = "Error editing player, check if it's exist";

    next(error);
  }
};

module.exports = {
  getPlayer,
  deletePlayer,
  createPlayer,
  editPlayer,
  getPlayerID,
};
