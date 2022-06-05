const express = require("express");
const { getPlayer } = require("../controllers/playerControllers");

const playerRouter = express.Router();

playerRouter.get("/", getPlayer);

module.exports = playerRouter;
