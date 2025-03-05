const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(4).max(24).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(4).max(24).required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };