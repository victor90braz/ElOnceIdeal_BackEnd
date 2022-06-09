const express = require("express");
const { validate } = require("express-validation");
const { playerCredentials } = require("../../schemas/playerCredentials");
const {
  getPlayer,
  deletePlayer,
  createPlayer,
} = require("../controllers/playerControllers");

const playerRouter = express.Router();

playerRouter.get("/", getPlayer);
playerRouter.delete("/:idPlayer", deletePlayer);
playerRouter.post("/", validate(playerCredentials), createPlayer);

module.exports = playerRouter;
