const { Schema, model, SchemaTypes } = require("mongoose");

const PlayerSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  year: {
    type: Date,
  },
  description: {
    type: String,
  },
  punctuation: {
    type: String,
    min: 0,
    max: 5,
  },
  played: {
    type: Boolean,
  },
  platform: {
    type: [{ type: SchemaTypes.ObjectId, ref: "Platform" }],
    default: [],
  },
});

const Player = model("Player", PlayerSchema, "players");
module.exports = Player;
