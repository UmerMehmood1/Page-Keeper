import { Joi } from "express-validation";

export const LoginValidation = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
