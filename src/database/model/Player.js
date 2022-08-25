const { Schema, model } = require("mongoose");

const PlayerSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  nationality: {
    type: String,
  },
  perfil: {
    type: String,
  },
  video: {
    type: String,
  },
  image: {
    type: String,
  },
  surname: {
    type: String,
  },

  date: {
    type: String,
  },

  position: {
    type: String,
  },

  speed: {
    type: Number,
  },
  shoot: {
    type: Number,
  },
  pass: {
    type: Number,
  },
  agility: {
    type: Number,
  },
  defense: {
    type: Number,
  },
  strength: {
    type: Number,
  },
});

const Player = model("Player", PlayerSchema, "players");
module.exports = Player;
