const Joi = require("joi");

const messageSchema = Joi.object({
  chat: Joi.string().required(),
  user: Joi.string().required(),
  text: Joi.string().required(),
});

const newChatSchema = Joi.object({
  users: Joi.array().items(Joi.string().required()).required(),
});

export const createMessageSchema = Joi.object({
  message: messageSchema.when("newChat", {
    is: Joi.exist(),
    then: messageSchema.keys({ chat: Joi.string().allow("") }),
    otherwise: messageSchema,
  }),
  newChat: newChatSchema.optional(),
});
