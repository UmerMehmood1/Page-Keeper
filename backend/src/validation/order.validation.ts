import { Joi } from "express-validation";

export const ShippingAddressValidation = Joi.object().keys({
  street: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  state: Joi.string().trim().required(),
  zipCode: Joi.string()
    .trim()
    .pattern(/^\d{5}(-\d{4})?$/)
    .required(),
  country: Joi.string().trim().required(),
});
