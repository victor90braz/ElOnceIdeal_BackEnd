const { Joi } = require("express-validation");

const playerCredentials = {
  body: Joi.object({
    name: Joi.string()
      .max(30)
      .messages({ message: "A name is required" })
      .required(),
    image: Joi.string()
      .messages({ message: "Content for the image is required" })
      .required(),
    speed: Joi.number().required(),
    shoot: Joi.number().required(),
    pass: Joi.number().required(),
    agility: Joi.number().required(),
    defense: Joi.number().required(),
    strength: Joi.number().required(),
  }),
};

module.exports = {
  playerCredentials,
};
