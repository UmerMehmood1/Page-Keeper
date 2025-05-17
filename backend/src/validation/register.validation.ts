import { Joi } from "express-validation";

export const RegisterValidation = Joi.object().keys({
  username: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
  passwordConfirm: Joi.string().min(1).required(),
});
