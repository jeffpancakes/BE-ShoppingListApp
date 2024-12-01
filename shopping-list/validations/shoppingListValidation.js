const Joi = require("joi");

const listIDSchema = Joi.object({
  listID: Joi.string()
    .min(24)
    .hex()
    .required()
});

const addListSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  items: Joi.array().items(
    Joi.object({
      id: Joi.string().length(24).hex().required(),
      solved: Joi.boolean().required()
    })
  ).optional(),
  members: Joi.array().items(
    Joi.object({
      id: Joi.string().length(24).hex().required()
    })
  ).optional(),
});

const updateListSchema = Joi.object({
  owner: Joi.string().length(24).hex().optional(),
  archived: Joi.boolean().optional(),
  name: Joi.string().min(1).max(100).optional(),
  items: Joi.array().items(
    Joi.object({
      id: Joi.string().length(24).hex().required(),
      solved: Joi.boolean().required()
    })
  ).optional(),
  members: Joi.array().items(
    Joi.object({
      id: Joi.string().length(24).hex().required()
    })
  ).optional()
});

module.exports = { listIDSchema, addListSchema, updateListSchema };