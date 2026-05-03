import Joi from 'joi';

const validateProduct = Joi.object({
  title: Joi.string()
    .max(100)
    .required()
    .messages({
      "string.max": "Title cannot exceed 100 characters"
    }),
  category: Joi.string()
    .valid("electronics", "fashion", "books", "homedecor","other")
    .required(),
  desc: Joi.string().required(),
  price: Joi.number()
    .min(5)
    .max(10000)
    .required(),
  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .default("pending"),
  saleStatus: Joi.string()
    .valid("available", "sold")
    .default("available")
});

export default validateProduct;