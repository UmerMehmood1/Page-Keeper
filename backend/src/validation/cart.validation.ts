import { Joi } from "express-validation";

export const CartValidation = Joi.object().keys({
  quantity: Joi.number().integer().min(0).required(),
});
