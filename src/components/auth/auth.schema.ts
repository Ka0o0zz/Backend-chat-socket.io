import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  phone: {
    callsign: Joi.string().required(),
    number: Joi.string().required(),
  },
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
