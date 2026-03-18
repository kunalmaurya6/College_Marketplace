import Joi from 'joi';

const productValidation = Joi.object({
    title: Joi.string()
        .min(5)
        .max(25)
        .required(),
    category: Joi.string()
        .min(5)
        .max(25)
        .required(),
    desc: Joi.string()
        .min(5)
        .required(),
    image: Joi.string()
        .uri()
        .required(),
    price: Joi.number()
        .min(10)
        .max(5000)
        .required(),
});

export default productValidation