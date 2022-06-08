const express = require("express");
const { getPlayer, deletePlayer } = require("../controllers/playerControllers");

const playerRouter = express.Router();

playerRouter.get("/", getPlayer);
playerRouter.delete("/:idPlayer", deletePlayer);

module.exports = playerRouter;
