import { Joi } from "express-validation";
const genres = [
  "Fiction",
  "Non-fiction",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Self-help",
  "Other",
];
export const BookValidation = Joi.object().keys({
  title: Joi.string().required(),
  author: Joi.string().required(),
  coverImage: Joi.string().required(),
  description: Joi.string().optional(),
  publicationDate: Joi.date().iso().required(),
  genre: Joi.string()
    .valid(...genres)
    .required(),
  publisher: Joi.string().optional(),
  inStock: Joi.number().integer().min(0).required(),
  price: Joi.number().precision(2).min(0).required(),
  quantity: Joi.number().integer().min(0).required(),
  rating: Joi.number().integer().min(0).required(),
  views: Joi.number().integer().min(0).required(),
  lastViewed: Joi.date().iso().allow(null),
  lastSoldAt: Joi.date().iso().allow(null),
});
