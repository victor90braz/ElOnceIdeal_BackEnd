const express = require("express");
const { validate } = require("express-validation");
const { playerCredentials } = require("../../schemas/playerCredentials");
const {
  getPlayer,
  deletePlayer,
  createPlayer,
  editPlayer,
  getPlayerID,
} = require("../controllers/playerControllers");

const playerRouter = express.Router();

playerRouter.get("/", getPlayer);
playerRouter.get("/:idPlayer", getPlayerID);
playerRouter.delete("/:idPlayer", deletePlayer);
playerRouter.post("/", validate(playerCredentials), createPlayer);
playerRouter.put("/:idPlayer", validate(playerCredentials), editPlayer);

module.exports = playerRouter;
