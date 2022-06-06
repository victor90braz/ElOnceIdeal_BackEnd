const { Schema, model } = require("mongoose");

const PlayerSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  surname: {
    type: String,
  },
  perfil: {
    type: String,
  },
  date: {
    type: String,
  },
  nationality: {
    type: String,
  },
  position: {
    type: String,
  },
  image: {
    type: String,
  },
  pac: {
    type: Number,
  },
  sho: {
    type: Number,
  },
  pass: {
    type: Number,
  },
  dri: {
    type: Number,
  },
  def: {
    type: Number,
  },
  phy: {
    type: Number,
  },
});

const Player = model("Player", PlayerSchema, "players");
module.exports = Player;
